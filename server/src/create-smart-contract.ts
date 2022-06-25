import { fstat, readFileSync, writeFileSync } from "fs"
import path from "path";
import { NFTContract } from "./models/NFTContract"
import { randomString } from "./utils/string-utils";

export const createNFTContract = (contract: NFTContract) => {

    const contractDirectory = __dirname + '/../../contracts'
    console.log({contractDirectory});
    let templateString = readFileSync(`${contractDirectory}/NFT.template.sol`).toString();

    templateString = templateString.replace("__CONTRACT_NAME__", contract.name);
    templateString = templateString.replace("__CONTRACT_SYMBOL__", contract.symbol);

    if (contract.maxSupply) {
        templateString = templateString.replace("//__MAX_SUPPLY_COUNT__", `uint256 public constant maxSupply = ${contract.maxSupply};`);
        templateString = templateString.replace("//__MAX_SUPPLY_REQUIRE__", `require(_tokenIds.current() < maxSupply);`);
    }
    templateString = templateString.replace(/^.*__EXAMPLE__.*$/mg, "");

    const fileHash = randomString();
    const generatedFileName = `${contractDirectory}/NFT.${fileHash}.sol`;
    writeFileSync(generatedFileName, templateString);
    console.log(`Created file: ${generatedFileName}`)
}

createNFTContract({name: "Tomiwa", symbol: "TA", maxSupply: 100});