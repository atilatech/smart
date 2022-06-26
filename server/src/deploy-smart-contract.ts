import { ethers } from "ethers";
import { CONFIG_CHAINS } from "./config";
import { NFTContract } from "./models/NFTContract"
import { getAccount, getProvider } from "./utils/network-utils";
import HarbegerNFT from "./artifacts/contracts/HarbegerNFT.sol/HarbegerNFT.json";
import { contractSettings } from "./create-smart-contract";


export const deploySmartContract = async (contract: NFTContract) => {
    const { chainId } = contract;

  if (!(chainId in CONFIG_CHAINS)) {
    let chainsForPrinting: any = {};
    Object.values(CONFIG_CHAINS).forEach(chain=>{chainsForPrinting[chain.CHAIN_ID]= `${chain.CHAIN_NAME} (${chain.NETWORK_NAME})`});
    chainsForPrinting = JSON.stringify(chainsForPrinting, null, 4);

    // characters at the beginning to make error print in a different color
    // https://stackoverflow.com/a/41407246/5405197
    console.error("\x1b[31m%s\x1b[0m", `Invalid chainId: ${chainId}.\nPlease select one of the following:\n${chainsForPrinting}`);
    process.exit(1);
  }
  const account = getAccount(chainId.toString());
  const provider = getProvider(chainId.toString());
  const gasPrice = await provider.getGasPrice();
  let NFT;
  NFT = new ethers.ContractFactory(HarbegerNFT.abi, HarbegerNFT.bytecode, account);
  
  const nft = await NFT.deploy({gasPrice});
  await nft.deployed();

  contract.address = nft.address.toLowerCase();

  const chainConfig = CONFIG_CHAINS[chainId];
  const blockExplorerURL = `${chainConfig.BLOCK_EXPLORER_URL}/address/${contract.address}`;
  console.log("\x1b[32m%s\x1b[0m", `NFT deployed to ${chainConfig.CHAIN_NAME} (${chainConfig.NETWORK_NAME}): ${contract.address}`);
  console.log("\x1b[32m%s\x1b[0m", `View in block explorer: ${blockExplorerURL}`);
}

deploySmartContract(contractSettings);