import { ethers } from "ethers";
const { CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY, INFURA_API_KEY} = process.env;

const hardHatSettings = {
    networks: {
        mumbai: {
          url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
          accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
          chainId: "80001"
        },
        rinkeby: {
          url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
          accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
          chainId: "4"
        },
        polygon: {
          url: `https://polygon-rpc.com`,
          accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
          chainId: "137"
        }
    }
};

// Helper method for fetching a connection provider to the Ethereum network
export function getNetworkSetting(chainId: string) {
    return Object.values(hardHatSettings.networks).find(chainSettings => chainSettings.chainId == chainId);
}


// Helper method for fetching a connection provider to the Ethereum network
export function getProvider(chainId: string) {
    const hardhatChainNetwork = getNetworkSetting(chainId);
    return ethers.getDefaultProvider(hardhatChainNetwork?.url);
}

export function getAccount(chainId: string) {

    const hardhatChainNetwork = getNetworkSetting(chainId);
    return new ethers.Wallet(hardhatChainNetwork!.accounts[0], getProvider(chainId));

}
