import { fstat, readFileSync, writeFileSync } from "fs"
import path from "path";
import { NFTContract } from "./models/NFTContract"
import { randomString } from "./utils/string-utils";

export const createSmartContract = (contract: NFTContract) => {

    const contractDirectory = __dirname + '/../../contracts';
    let contractCode = readFileSync(`${contractDirectory}/NFT.template.sol`).toString();

    contractCode = contractCode.replace("__CONTRACT_NAME__", contract.name);
    contractCode = contractCode.replace("__CONTRACT_SYMBOL__", contract.symbol);

    contractCode = contractCode.replace(/^.*__MAX_SUPPLY_COUNT__.*$/mg, contract.maxSupply ? `uint256 public constant maxSupply = ${contract.maxSupply};` : "");
    contractCode = contractCode.replace(/^.*__MAX_SUPPLY_REQUIRE__.*$/mg, contract.maxSupply ? `require(_tokenIds.current() < maxSupply);` : "");

    contractCode = contractCode.replace(/^.*__EXAMPLE__.*$/mg, "");

    const fileHash = randomString();
    const generatedFileName = `${contractDirectory}/NFT.${fileHash}.sol`;
    writeFileSync(generatedFileName, contractCode);
    console.log(`Created file: ${generatedFileName}`);

    return {
        contractCode,
    }
}