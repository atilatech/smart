# Smart

> Smart art smart contracts. 

Smart is a collection of smart contracts for tokenizing art using NFTs.

Remember, [everything is art](#everything-is-art), so you can use this to tokenize all the things.

## About

This project implements [Harberger Taxes](https://medium.com/@simondlr/what-is-harberger-tax-where-does-the-blockchain-fit-in-1329046922c6) using [NFTs](https://github.com/atilatech/smart/blob/4cacae1e5524f71f4c1c43ab0e50bdf7d666bad9/server/contracts/HarbegerNFT.sol). A Harberger Tax is a tax scheme where the owner of the asset picks the price at which they value an asset. The owner then pays a recurring tax on that self-assesed value. Anyone can force the owner to sell it to them if they offer to buy the asset at the price set by the seller. This incentivizes people to give an accurate estimate of how much they value the property.

A High-level walkthrough for the [NFT implementation of a Harbeger Tax](https://github.com/atilatech/smart/blob/4cacae1e5524f71f4c1c43ab0e50bdf7d666bad9/server/contracts/HarbegerNFT.sol):

1. Create an NFT
1. Set the `LIST_PRICE`
1. Someone buys the NFT for `LIST_PRICE`
    1.  Buyer sets a new `LIST_PRICE` and pays a recurring `NFT_TAX_PERCENTAGE`  on the new `LIST_PRICE` to the creator
1. If there is an unpaid tax balance, the creator may claim the asset back
1. At any time, anyone may buy the asset for `LIST_PRICE` 


### Streaming Payments

In addition to a Harberger tax, we tried to add a payment stream to the Harbeger NFT. The idea is that instead of having to remember to pay your balance each time it's due, you can simply stream your tax payments automatically to the creator.

## Background

Smart was [built during the ETHNYC 2022 Hackathon](https://ethglobal.com/showcase/smart-a24kg) ([Hackathon Pull Request](https://github.com/atilatech/smart/pull/1)).

We were inspired by Yos Riady's blog post, [Harbeger Taxes on Ethereum](https://yos.io/2018/11/18/harberger-taxes) and Yos and Melodie Sim's [Hackathon project](https://devpost.com/software/patronage-collectibles), [Patronage Collectibles](https://github.com/happytreat/PatronageCollectibles).

## Project Structure

The smart contracts can be found in [`server/contracts`](server/contracts)

The UI for interacting with the smart contracts can be found in [`client`](client)

The Contracts were deployed to the Ethereum Rinkeby, Polygon Mumbai and Optimism Kovan testnets. You can find a list of the deployed contract addresses in the [#contracts] section.

In hindsight, the smart contracts and client code would have gone into one folder. However, this structure was chosen because during the ETHNYC hackathon hackathon, the original idea was to create smart contracts dynamically via an API. We ended up pivoting the idea slightly and didn't have enough time to refactor the code.

## Quickstart


### Server

```bash
cd server
yarn install
npx tsc
npx hardhat compile
cp src/artifacts ../client/src/artifacts
```

### Client

```bash
cd client
yarn install
yarn start
```

## Server Instructions



## Verifying Smart Contracts

```bash
npx hardhat verify --network rinkeby \
0xb275e2ebbd2d381390ad3c229df0ec3dd0e9edf5 
```
"0x27f7e8d7c63c414eae2bb07e1a9b9057a1d382cf" "0x27f7e8d7c63c414eae2bb07e1a9b9057a1d382cf" 250




# Appendix

## Improvements


- Call `_transferFrom` function when token is transferred (`_changeOwner`)
- Do we have to re-implement all the OpenZeppelin ERC721, is there way to ovveride non-virtual
- making the tax frequency too soon makes it harder to pay taxes before it increases again
- `Superfluid` docs
- Hard to get Optimistic Kovan faucet

## Why was the name Smart chosen?

The name smart was chosen because it's a play on the word smart contracts, it contains the word art and most importantly, it reminds us that we're all smart. 


### We're all Smart



According to the dictionary: [Smart means](https://www.merriam-webster.com/dictionary/intelligence)

> having or showing a quick-witted intelligence.

[Intelligence means](https://www.merriam-webster.com/dictionary/intelligence)
> the ability to learn or understand or to deal with new or trying situations

Basically, anytime you learn something new, it means you're being smart. If you're reading this for the first time, you're being smart right now. You're acting smart a lot more than you realize. Which means you're smarter than you think.

### Everything is art

When peple hear that "__Smart is a collection of smart contracts for tokenizing art using NFTs.__", they might think that means it can only be used for things like art or paintings.

This is because when people think of art, they think of visual arts like paintings, audio arts like music media arts like books and movies. However, according to the [dictionary](https://www.merriam-webster.com/dictionary/art) and [Wikipedia](https://en.wikipedia.org/wiki/Art), art is basically anything that we humans create.

> 1: skill acquired by experience, study, or observation
> 2: a branch of learning
> 3: an occupation requiring knowledge or skill

[dictionary](https://www.merriam-webster.com/dictionary/art)


> 1: skill acquired by experience, study, or observation
> 2: a branch of learning
> 3: an occupation requiring knowledge or skill

[dictionary](https://www.merriam-webster.com/dictionary/art)

This means that anytime you do something using a skill you've learned, you've made art. This also means that art can be anything from a great song, to a brilliant piece of code, to a life-saving drug, a clever economic concept, to a brilliant athletic maneuver.

TODO: Add links to each example. Think about how to handle the subjectivity of examples and links.

Note: We are merely using the dictionary here to make my arguements more convincing.  [appealing to authority](https://www.logicallyfallacious.com/logicalfallacies/Appeal-to-Authority). The definitions of words are social constructs so society determines what a word means not the dictionary. See: [Did We Change the Definition of 'Literally'](https://www.merriam-webster.com/words-at-play/misuse-of-literally)?



## Deployed Contracts

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
