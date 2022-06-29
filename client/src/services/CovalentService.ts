import request from "axios";
import { REACT_APP_COVALENT_API_KEY } from "../config";

class CovalentService {

    static baseURL = 'https://api.covalenthq.com/v1'

    static getNFTMetadata = (chainId: string, address: string, tokenId: number) => {

        const apiCompletionPromise = request({
            method: 'get',
            url: `${CovalentService.baseURL}/${chainId}/tokens/${address}/${tokenId}/?key=${REACT_APP_COVALENT_API_KEY}`,
        });

        return apiCompletionPromise;
    };
}

export default CovalentService;