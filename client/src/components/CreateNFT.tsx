import React from 'react'
import HarbegerNFT from "../artifacts/contracts/HarbegerNFT.sol/HarbegerNFT.json";
import { ethers } from "ethers";
import Web3Modal from 'web3modal';
import { Button } from 'antd';

function CreateNFT() {

  const tokenUri = "https://bafybeiet5jzl6mt7g575atqr2l4tso7w5orknjhgleakzix3mhdab5nijq.ipfs.infura-ipfs.io/";
  const contractAddress = "0xe5f9c0a000bad3188fdede235b6537655139e9a9";


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
  return (
    <div>
        <h1>
            CreateNFT

            <Button onClick={createToken}>
                Create NFT
            </Button>
        </h1>
    </div>
  )
}

export default CreateNFT