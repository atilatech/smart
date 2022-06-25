export interface NFTContract {
    name: string,
    symbol: string,
    owner: string,
    maxSupply?: number | null,
    filePath?: string,
    chainId: string | number,
    address?: string,
    blockExplorerUrl?: string,
    royalty?: {
        royaltyRecipient: string,
        royaltyFeePercentage: number,
    } | null
}