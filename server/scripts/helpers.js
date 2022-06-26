const { CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY, INFURA_API_KEY} = process.env;

const hardHatSettings = {
    networks: {
        mumbai: {
          url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
          accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
        },
        polygonMumbai: {
          url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
          accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
        },
        optimisticKovan: {
          url: `https://optimism-kovan.infura.io/v3/${INFURA_API_KEY}`,
          accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
        },
        rinkeby: {
          url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
          accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
        },
        polygon: {
          url: `https://polygon-rpc.com`,
          accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
        }
    }
};

module.exports = {
    hardHatSettings,
}
