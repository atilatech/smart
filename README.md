# Smart

Smart art smart contracts.

## Quickstart

### Server

`cd server`

`node index.js`

### Web App

`cd client`

`yarn start`

## Server Instructions

To run the typescript files, you first have to compile them to `javascript` then run the compiled file.

For example:

- To run `src/create-smart-contract.ts`
- Compile the folder `npx tsc`
- Then run the combipled javascript file `node dist/src/create-smart-contract.js`

## Verifying Smart Contracts

```bash
npx hardhat verify --network rinkeby 0xb275e2ebbd2d381390ad3c229df0ec3dd0e9edf5 "0x27f7e8d7c63c414eae2bb07e1a9b9057a1d382cf" "0x27f7e8d7c63c414eae2bb07e1a9b9057a1d382cf" 250
```


## Verified Contracts

### Ethereum (Rinkeby)

`0x774f0ebcc5b481bd07f6ce7cf1a5ad69d52181ca`
https://rinkeby.etherscan.io/address/0x774f0ebcc5b481bd07f6ce7cf1a5ad69d52181ca

Backup:
or `0x562fb8007be0fbd2c6be21fc557a45d89f8ba31a`
https://rinkeby.etherscan.io/address/0x562fb8007be0fbd2c6be21fc557a45d89f8ba31a

### Polygon
NFT deployed to Polygon (Mumbai): 0x5fbc39092373b0e1c125c0e29c01e12045d3fe81
View in block explorer: https://mumbai.polygonscan.com/address/0x5fbc39092373b0e1c125c0e29c01e12045d3fe81

## Optimism (Kovan)
NFT deployed to Optimism (Kovan): 0x290541b82b151cdc05ea1af04fe74f6d7633ccdc
View in block explorer: https://kovan-optimistic.etherscan.io//address/0x290541b82b151cdc05ea1af04fe74f6d7633ccdc


- Call `_transferFrom` function when token is transferred (`_changeOwner`)
- Do we have to re-implement all the OpenZeppelin ERC721, is there way to ovveride non-virtual
- making the tax frequency too soon makes it harder to pay taxes before it increases again
- `Superfluid` docs
- Hard to get Optimistic Kovan faucet