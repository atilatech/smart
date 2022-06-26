import { useState } from 'react'
import { Alert, AlertProps, Button, Spin, Tag } from 'antd';
import HarbegerNFT from "../artifacts/contracts/HarbegerNFT.sol/HarbegerNFT.json";
import { CONFIG_CHAINS } from '../config';
import { NFTMetadata } from '../models/NFT';

// import "./NFTCard.scss";
import { BigNumber, ethers } from 'ethers';
import { MarketplaceDisplay } from '../models/Marketplace';
import CryptoPrice from './CryptoPrice';
import CryptoPriceEdit from './CryptoPriceEdit';

import Web3Modal from 'web3modal';
import { CreateRoyaltyStream } from './CreateRoyaltyStream';

function NFTCard({nft: defaultNft}: {nft: NFTMetadata}) {

    const [listPrice, setListPrice] = useState<BigNumber>(BigNumber.from(0));
    const [nft, setNft] = useState<NFTMetadata>(defaultNft);
    const [showEditListPrice, setShowEditListPrice] = useState(false);
    const { chainId } = nft;
    let signer: ethers.providers.JsonRpcSigner;
    const [responseMessage, setResponseMessage] = useState<{[key: string]: {message: string, type: AlertProps["type"], loading?: boolean}}>({});

    const [isCreateRoyaltyStream, setisCreateRoyaltyStream] = useState(false);

    const activeChain = CONFIG_CHAINS[chainId!];

    console.log({activeChain, chainId, CONFIG_CHAINS});
    const nftBlockExplorerUrl = `${activeChain.BLOCK_EXPLORER_URL}/${activeChain.CHAIN_NAME !== "Harmony" ? "token": "address"}/${activeChain.NFT_ADDRESS}?a=${nft.tokenId}`;

    const getSigner = async () => {
        if(signer) {
            return signer
        } else {
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)    
            return provider.getSigner()
        }
    }

    const setPrice = async  () => {

        try {
        
        /* then list the item for sale on the marketplace */
        signer = await getSigner()

        const nftContract = new ethers.Contract(activeChain.NFT_ADDRESS, HarbegerNFT.abi, signer);

        await nftContract.setPrice(nft.tokenId, listPrice);
        
        const signerAddress = await signer.getAddress();

        setResponseMessage({
            ...responseMessage,
            setPrice: {
               type: "success",
               message: "Succesfully listed market item for sale",
             }
             });
        } catch (error: any) {
            setResponseMessage({
                ...responseMessage,
                setPrice: {
                   type: "error",
                   message: error?.data?.message||JSON.stringify(error),
                 }
                 });
        }
    };

    const getHarbegerInfo = async  () => {

        try {
        
        /* then list the item for sale on the marketplace */
        signer = await getSigner()

        const nftContract = new ethers.Contract(activeChain.NFT_ADDRESS, HarbegerNFT.abi, signer);

        const [creator, owner, taxToCollect, price, _canReclaim] = await nftContract.info(nft.tokenId);
        const taxOwed = await nftContract.taxOwed(nft.tokenId);

        console.log({creator, owner, taxBalance: taxOwed, taxToCollect, price, _canReclaim});
        console.log("taxBalance, price, taxes",
         ethers.utils.formatUnits(taxOwed),
         ethers.utils.formatUnits(price),
         ethers.utils.formatUnits(taxToCollect));
        setNft({
            ...nft,
            harbegerTax: {creator, owner, taxOwed, price, canReclaim: _canReclaim, taxToCollect}
        });

        setResponseMessage({
            ...responseMessage,
            getHarbegerInfo: {
               type: "success",
               message: "Succesfully Retrieved Harbeger info",
             }
             });
        } catch (error: any) {
            setResponseMessage({
                ...responseMessage,
                setPrice: {
                   type: "error",
                   message: error?.data?.message||JSON.stringify(error),
                 }
                 });
        }
    };

    const buyNFT = async  () => {

        try {
        
            /* then list the item for sale on the marketplace */
            signer = await getSigner()
    
            const nftContract = new ethers.Contract(activeChain.NFT_ADDRESS, HarbegerNFT.abi, signer);
    
            await nftContract.buy(nft.tokenId, nft.harbegerTax?.price, { value: nft.harbegerTax?.price});
    
            setResponseMessage({
                ...responseMessage,
                setPrice: {
                   type: "success",
                   message: "Succesfully listed market item for sale",
                 }
                 });
            } catch (error: any) {
                setResponseMessage({
                    ...responseMessage,
                    setPrice: {
                       type: "error",
                       message: error?.data?.message||JSON.stringify(error),
                     }
                     });
            }

    };


    const payRoyalties = async  () => {

        try {
        
            /* then list the item for sale on the marketplace */
            signer = await getSigner()

            const nftContract = new ethers.Contract(activeChain.NFT_ADDRESS, HarbegerNFT.abi, signer);
            // multiply by 10% to account for change in taxOwed if high frequency
            await nftContract.deposit(nft.tokenId, { value: nft.harbegerTax?.taxOwed.mul( 110 ).div(100) });
    
            setResponseMessage({
                ...responseMessage,
                setPrice: {
                   type: "success",
                   message: "Succesfully listed market item for sale",
                 }
                 });
            } catch (error: any) {
                setResponseMessage({
                    ...responseMessage,
                    setPrice: {
                       type: "error",
                       message: error?.data?.message||JSON.stringify(error),
                     }
                     });
            }

    };

    const collectRoyalties = async  () => {

        try {
        
            /* then list the item for sale on the marketplace */
            signer = await getSigner()

            const nftContract = new ethers.Contract(activeChain.NFT_ADDRESS, HarbegerNFT.abi, signer);
            // multiply by 10% to account for change in taxOwed if high frequency
            await nftContract.collect(nft.tokenId);
    
            setResponseMessage({
                ...responseMessage,
                collectRoyalties: {
                   type: "success",
                   message: "Succesfully collected your royalties!",
                 }
                 });
            } catch (error: any) {
                setResponseMessage({
                    ...responseMessage,
                    collectRoyalties: {
                       type: "error",
                       message: error?.data?.message||JSON.stringify(error),
                     }
                     });
            }

    };

    return (
        <div className="NFTCard card shadow">
        <img src={nft.image}  alt={nft.name} width="auto" height="300" className="m-3"/>
        <div className="p-4">
        <h3 className="text-2xl font-semibold">{nft.name}</h3>
        <hr/>

        <div className="description">
            <p>{nft.description}</p>
        </div>
        <hr/>

        <div className="actions">
            <>
            {showEditListPrice ? 
            <>
                <CryptoPriceEdit currencySymbol={activeChain.CURRENCY_SYMBOL} onPriceChange={({cryptoPrice}) => {
                    if(cryptoPrice) {
                        setListPrice(cryptoPrice);
                    }
                }} />
                <Button onClick={setPrice} className="mb-3">
                    List for Sale
                </Button>
            </>
            :
                <Button onClick={()=>setShowEditListPrice(true)} className="mb-3">
                    List for Sale
                </Button>
            }
             <br/>
            </>

                <Button onClick={getHarbegerInfo} className="mb-3">
                    Show Royalties Info
                </Button>

            {nft.harbegerTax && 
            <ol>
                <li>
                    <>
                    Price: <CryptoPrice cryptoPrice={nft.harbegerTax.price as BigNumber} currencySymbol={activeChain.CURRENCY_SYMBOL} />
                    <Button onClick={buyNFT}>
                        Buy
                    </Button>
                    </>
                </li>
                <li>
                    <>
                    Royalties Owed: <CryptoPrice cryptoPrice={nft.harbegerTax.taxOwed as BigNumber} currencySymbol={activeChain.CURRENCY_SYMBOL} />

                    <Button onClick={payRoyalties} className="mb-3">
                        Pay Royalties
                    </Button>

                    <Button onClick={() => setisCreateRoyaltyStream(!isCreateRoyaltyStream)} className="mb-3" color='green'>
                        Stream Royalties
                    </Button>

                    {isCreateRoyaltyStream && 
                        <CreateRoyaltyStream />
                    }
                    </>
                </li>
                <li>
                    <>
                    Available Royalties: <CryptoPrice cryptoPrice={nft.harbegerTax.taxToCollect as BigNumber} currencySymbol={activeChain.CURRENCY_SYMBOL} />
                    <Button onClick={collectRoyalties}>
                        Collect Royalties
                    </Button>
                    </>
                </li>
            </ol>
            }


            {Object.values(responseMessage).filter(response=>response.message).map(response => (
            <Alert
                key={response.message}
                type={response.type}
                message={<>
                {response.message}{' '}
                {response.loading && <Spin />}
                </>
                }
                style={{maxWidth: '300px'}}
                className="my-2"
                />
            ))}
        </div>
        <hr/>

        <div className="mb-2 metadata">
            <Tag color="blue" className='mb-2'>
                    {activeChain.CHAIN_NAME}
                    <img src={activeChain.LOGO_URL} alt={activeChain.CHAIN_NAME} width={25} />
            </Tag><br/>
            <a href={nftBlockExplorerUrl} target="_blank" rel="noreferrer" className="ml-1">
                View NFT on Block Explorer
            </a>
            <MarketplaceDisplay.ListedMarketplaces chain={activeChain} nft={nft} />
        </div>
        </div>
        </div>
    )
}

export default NFTCard