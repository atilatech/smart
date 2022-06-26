export interface NFTContract {
    name: string,
    symbol: string,
    chainId: string | number,
    // the following variables become available after the contract has been deployed
    address?: string,
    blockExplorerUrl?: string,
    harbegerTax?: {
        percentage: number,
        frequency: string,
    } | null
}