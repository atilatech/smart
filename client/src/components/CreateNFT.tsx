import React, { useState } from 'react'
import HarbegerNFT from "../artifacts/contracts/HarbegerNFT.sol/HarbegerNFT.json";
import { ethers } from "ethers";
import Web3Modal from 'web3modal';
import { Button, Col, Input, Row, Spin } from 'antd';
import Moralis from 'moralis';
import { Chain } from '../models/Chain';
import { components } from 'moralis/types/generated/web3Api';
import { CONFIG_CHAINS } from '../config';
import axios from 'axios';
import { NFTMetadata } from '../models/NFT';
import NFTCard from './NFTCard';
import { create as ipfsHttpClient } from 'ipfs-http-client';

const { TextArea } = Input;

const ipfsHostUrl = 'https://ipfs.infura.io:5001/api/v0';
const client = (ipfsHttpClient as any)(ipfsHostUrl);

function CreateNFT() {

  const chainId = "4";
  const tokenUri = "https://bafybeiet5jzl6mt7g575atqr2l4tso7w5orknjhgleakzix3mhdab5nijq.ipfs.infura-ipfs.io/";
  const contractAddress = "0x774f0ebcc5b481bd07f6ce7cf1a5ad69d52181ca";
  const [newNFT, setNewNFT] = useState<NFTMetadata>();
  const [fileUrl, setFileUrl] = useState<string|null>(null)
  const [formInput, updateFormInput] = useState({ price: 0, name: '', description: '', tokenId: 0 });
  const [error, setError] = useState("");
  const [nfts, setNfts] = useState<Array<NFTMetadata>>([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [nftMetadataUrl, setNftMetadataUrl] = useState("");


  async function onChange(e: any) {
    const file = e.target.files[0];
    // setFileUrl("https://atila.ca/static/media/atila-upway-logo-gradient-circle-border.bfe05867.png");
    // return;
    try {
      const added = await client.add(
        file,
        {
          progress: (progressValue: any) => console.log(`received: ${progressValue}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error);
      setError(JSON.stringify(error));
    }  
  }
  async function getNFTMetadataUrl () {

    if (nftMetadataUrl) {
      return nftMetadataUrl;
    }
    try {
      let url;
      const { name, description } = formInput
      if (!name || !description || !fileUrl) return
        /* first, upload to IPFS */
        const data = JSON.stringify({
          name, description, image: fileUrl
        })

        const added = await client.add(data)
        url = `https://ipfs.infura.io/ipfs/${added.path}`
        // url = "https://bafybeicjitpyvkvqrm63pnfwv2e7wxkqb6meg3vemz6s7cyc4bpcuaz44y.ipfs.infura-ipfs.io/"
        /* after file is uploaded to IPFS, pass the URL to save it on Network */
        setNftMetadataUrl(url);
        return url;

    } catch (error) {
      console.log('Error uploading file: ', error)
    } 

  };

  const mintNFT = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner();
    const url = await getNFTMetadataUrl();

    let nftContract = new ethers.Contract(contractAddress, HarbegerNFT.abi, signer);
    let mintTransactionPromise = await nftContract.mint(formInput.tokenId, url);
    let mintTransaction = await mintTransactionPromise.wait();

    console.log({mintTransaction, mintTransactionPromise});

  }

  const loadNFTs = async () => {
    const chainConfig = new Chain({...CONFIG_CHAINS[chainId]});
  
    setLoadingState(`Loading NFTs for ${chainConfig.getChainFullName()}`);
    const options = {
      // needed to resolve typescript compilation errors because "chain" was being interpreted as a string that can accept many values
      // Types of property 'chain' are incompatible.
      // Type 'string' is not assignable to type '"rinkeby" | "eth" | "0x1" | "ropsten" | "0x3" | ... N more ... |
      // see: https://bobbyhadz.com/blog/typescript-type-string-is-not-assignable-to-type
      chain: `0x${(Number.parseInt(chainId)).toString(16)}` as components["schemas"]["chainList"],
      address: contractAddress,
    };
    let data;
    data = await Moralis.Web3API.token.getAllTokenIds(options);

    let items = await Promise.all(data.result!.map(async (token) => {
        let metadata;
        if (!token.metadata && token.token_uri) {
          // Moralis doesn't fetch the metadata from URI immediately so we may have to manually fetch it ourselves
          metadata = (await axios.get(token.token_uri)).data || {};
        } else {
          metadata = JSON.parse(token.metadata || "{}");
        }
        const { name, description, image } = metadata;
        // let price = token.price ? ethers.utils.formatUnits(token.price.toString(), 'ether') : "";
        let item: NFTMetadata = {
          // price,
          tokenId: token.token_id,
          // seller: token.seller,
          owner: (token as any).owner_of,
          name,
          description,
          image,
          chainId: chainId,
        }
        return item
      }));

    console.log({data, items});
    setLoadingState('loaded');
    setNfts(items);

  }

  return (
    <div className='container card'>
        {loadingState?.toLowerCase().includes("loading") && <Spin size="large"  tip={loadingState}/>}
        <h1>
            CreateNFT

            <Input 
                placeholder="Token ID"
                type="number"
                onChange={e => updateFormInput({ ...formInput, tokenId: Number.parseInt(e.target.value) })}
            />

            <Input 
                placeholder="Name"
                onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
            />
            <TextArea
                placeholder="Description"
                onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
            />
            <Input
                type="file"
                name="NFT"
                className="my-4"
                onChange={onChange}
            />
            {
              fileUrl && (
                <img className="rounded mt-4" width="350" src={fileUrl} alt="User NFT Upload" />
              )
            }
            <Button onClick={mintNFT}>
                Create NFT
            </Button>
        </h1>

        <hr/>

        <h1>
            Gallery
        </h1>

        <div>

            <Button onClick={loadNFTs}>
                    Load NFTs
            </Button>

            <hr/>

            <Row gutter={[24,24]}>
            {
              nfts.map((nft: NFTMetadata, i: number) => {
  
                return(
                  <Col md={8} sm={24} key={nft.tokenId}>
                    <NFTCard nft={nft} />
                  </Col>
                )
  
              })
            }
        </Row>

        </div>
    </div>
  )
}

export default CreateNFT