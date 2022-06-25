import { fstat, readFileSync, writeFileSync } from "fs"
import path from "path";
import { NFTContract } from "./models/NFTContract"

export const createNFTContract = (contract: NFTContract) => {

    const contractDirectory = path.basename(path.dirname(__dirname)) + "/contracts"
    console.log({contractDirectory});
    let templateString = readFileSync(`${contractDirectory}/NFT.template.sol`).toString();

    templateString = templateString.replace("__CONTRACT_NAME__", contract.name);
    templateString = templateString.replace("__CONTRACT_SYMBOL__", contract.symbol);

    writeFileSync(`${contractDirectory}/NFT.sol`, templateString);
}

createNFTContract({name: "Tomiwa", symbol: "TA"});