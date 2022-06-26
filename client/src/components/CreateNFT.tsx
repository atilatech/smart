import React, { useState } from 'react'
import HarbegerNFT from "../artifacts/contracts/HarbegerNFT.sol/HarbegerNFT.json";
import { ethers } from "ethers";
import Web3Modal from 'web3modal';
import { Button, Spin } from 'antd';
import Moralis from 'moralis';
import { Chain } from '../models/Chain';
import { components } from 'moralis/types/generated/web3Api';
import { CONFIG_CHAINS } from '../config';
import axios from 'axios';
import { NFTMetadata } from '../models/NFT';
import NFTCard from './NFTCard';

function CreateNFT() {

  const chainId = "4";
  const tokenUri = "https://bafybeiet5jzl6mt7g575atqr2l4tso7w5orknjhgleakzix3mhdab5nijq.ipfs.infura-ipfs.io/";
  const contractAddress = "0x774f0ebcc5b481bd07f6ce7cf1a5ad69d52181ca";
  const [nfts, setNfts] = useState<Array<any>>([]);
  const [loadingState, setLoadingState] = useState('not-loaded');


  const createToken = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()

    let nftContract = new ethers.Contract(contractAddress, HarbegerNFT.abi, signer);
    let mintTransactionPromise = await nftContract.mint(1, tokenUri);
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

            <Button onClick={createToken}>
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

            {nfts.map(nft => (
                <NFTCard nft={nft} />
            ))}

        </div>
    </div>
  )
}

export default CreateNFT