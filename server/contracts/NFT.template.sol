// contracts/NFT.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    //__MAX_SUPPLY_COUNT__
    //__EXAMPLE__ uint256 public constant maxSupply = 2;

    event NFTMinted (
        uint256 indexed tokenId,
        string tokenURI
    );
    constructor() ERC721("__CONTRACT_NAME__", "__CONTRACT_SYMBOL__") {}

    function createToken(string memory tokenURI) public returns (uint) {
        //__MAX_SUPPLY_REQUIRE__
        //__EXAMPLE__ require(_tokenIds.current() < maxSupply);
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        emit NFTMinted(newTokenId, tokenURI);
        return newTokenId;
    }
}