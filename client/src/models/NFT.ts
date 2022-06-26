import { BigNumber } from "ethers";

export interface NFTMetadata {
    name: string,
    image: string,
    description: string,
    // following properties only exist if the NFT has been minted
    chainId?: string,
    tokenId?: string,
    tokenURI?: string,
    address?: string,
    // following properties only exist if the NFT is listed for sale
    price?: BigNumber,
    seller?: string,
    itemId?: string,
    owner?: string,
    harbegerTax?: {
        creator: string,
        owner: string,
        taxBalance: BigNumber,
        price: BigNumber,
        canReclaim: boolean,
    }
}