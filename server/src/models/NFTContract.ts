export interface NFTContract {
    name: string,
    symbol: string,
    maxSupply?: number | null,
    royalty?: {
        recipientAddress: string,
        royaltyFeePercentage: number,
    } | null
}