import React, { useEffect, useState } from 'react'
import { CONFIG_CHAINS } from '../config';
import CovalentService from '../services/CovalentService';
import {withRouter,} from "react-router-dom";
import NFTCard from '../components/NFTCard';
import { NFTMetadata } from '../models/NFT';

function NFTDetail(props: any) {

  const chainId = "4";
  const [nft, setNft] = useState<NFTMetadata>();

  const activeChain = CONFIG_CHAINS[chainId];

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {

    console.log(" props",  props);

    const  {match : {params : { chainId, nftAddress, tokenId }}} = props;
    const nftResponse = (await CovalentService.getNFTMetadata(chainId, nftAddress, tokenId ))?.data.data.items[0].nft_data[0].external_data;

    nftResponse.tokenId = tokenId;
    nftResponse.chainId = chainId;
    nftResponse.address = nftAddress;

    console.log({ nftResponse, chainId, nftAddress, tokenId })
    setNft(nftResponse);

  }
  return (
    <div>
        <h1>
            NFT Detail
        </h1>

        {nft &&  <NFTCard nft={nft} />}


    </div>
  )
}
export default withRouter(NFTDetail);