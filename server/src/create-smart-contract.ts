import { readFileSync, writeFileSync } from "fs"
import { NFTContract } from "./models/NFTContract"
import { uploadFile } from "./utils/file-utils";
import { randomString } from "./utils/string-utils";

export const createSmartContract = async (contract: NFTContract) => {

    const contractDirectory = __dirname + '/../../contracts';
    let contractCode = readFileSync(`${contractDirectory}/NFT.template.sol`).toString();

    contractCode = writeCode(contractCode, contract);

    const fileHash = randomString();
    const generatedFileName = `NFT.${fileHash}.sol`
    const generatedFilePath = `${contractDirectory}/${generatedFileName}`;

    writeFileSync(generatedFilePath, contractCode);

    const codeUrl = await uploadFile(generatedFileName, contractCode);

    return {
        codeUrl,
    }
}

function writeCode(contractCode: string, contract: NFTContract) {
    contractCode = contractCode.replace("__CONTRACT_NAME__", contract.name);
    contractCode = contractCode.replace("__CONTRACT_SYMBOL__", contract.symbol);

    contractCode = contractCode.replace(/^.*__MAX_SUPPLY_COUNT__.*$/mg, contract.maxSupply ? `    uint256 public constant maxSupply = ${contract.maxSupply};` : "");
    contractCode = contractCode.replace(/^.*__MAX_SUPPLY_REQUIRE__.*$/mg, contract.maxSupply ? `    require(_tokenIds.current() < maxSupply);` : "");

    contractCode = contractCode.replace(/^.*__EXAMPLE__.*$/mg, "");
    return contractCode;
}
