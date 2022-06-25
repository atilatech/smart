export interface NFTContract {
    name: string,
    symbol: string,
    maxSupply?: number | null,
    royalty?: {
        recipient_address: string,
        royalty_fee_percentage: number,
    } | null
}