import { readFileSync, writeFileSync } from "fs"
import { NFTContract } from "./models/NFTContract"
import { uploadFile } from "./utils/file-utils";

export const createSmartContract = async (contract: NFTContract) => {

    const contractDirectory = __dirname + '/../../contracts';
    let contractCode = readFileSync(`${contractDirectory}/HarbegerNFT.template.sol`).toString();

    contractCode = writeCode(contractCode, contract);

    const generatedFileName = "HarbegerNFT.sol";
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

    if (contract.harbegerTax?.percentage) {
        const taxBasisPoints = contract.harbegerTax.percentage * 100;
        contractCode = contractCode.replace("constant TAX_NUMERATOR = 100", `"constant TAX_NUMERATOR = ${taxBasisPoints}"`);
    }    

    if (contract.harbegerTax?.frequency) {
        const taxFrequency = contract.harbegerTax.frequency;
        contractCode = contractCode.replace("constant TAX_INTERVAL = 1 minutes", `"constant TAX_INTERVAL = ${taxFrequency}"`);
    }


    contractCode = contractCode.replace(/^.*__EXAMPLE__.*$/mg, "");
    return contractCode;
}
