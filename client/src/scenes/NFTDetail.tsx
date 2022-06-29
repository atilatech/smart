import React, { useEffect, useState } from 'react'
import { CONFIG_CHAINS } from '../config';
import CovalentService from '../services/CovalentService';
import {withRouter,} from "react-router-dom";

function NFTDetail(props: any) {

  const chainId = "4";
  const [loadNft, setLoadNft] = useState({});

  const activeChain = CONFIG_CHAINS[chainId];

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {

    console.log(" props",  props);

    const nft = await CovalentService.getNFTMetadata(chainId, activeChain.NFT_ADDRESS, 1 );
    console.log([nft]);
  }
  return (
    <div>
        <h1>
            NFT Detail
        </h1>


    </div>
  )
}
export default withRouter(NFTDetail);