import { create } from 'ipfs-http-client';

const ipfsHostUrl = 'https://ipfs.infura.io:5001/api/v0';
const ipfsClient = (create as any)(ipfsHostUrl);

export const uploadFile = async (fileName: string, content: string) => {

    const file = await ipfsClient.add({ fileName, content });

    const ipfsUrl = `https://ipfs.infura.io/ipfs/${file.cid}`;

    return ipfsUrl;
}