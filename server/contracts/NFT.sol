// contracts/NFT.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract NFT is ERC721URIStorage, IERC2981, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address private royaltyRecipient;
    uint256 private royaltyFeeBasisPoints;
    uint256 public constant maxSupply = 99;


    event NFTMinted (
        uint256 indexed tokenId,
        string tokenURI
    );

    constructor(address owner, address defaultRoyaltyRecipient, uint256 defaultRoyaltyFeeBasisPoints) 
    ERC721("Tomiwa", "TA") {
        royaltyRecipient = defaultRoyaltyRecipient;
        royaltyFeeBasisPoints = defaultRoyaltyFeeBasisPoints;
        _transferOwnership(owner);
    }

    function createToken(string memory tokenURI) public returns (uint) {
    require(_tokenIds.current() < maxSupply);

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        emit NFTMinted(newTokenId, tokenURI);
        return newTokenId;
    }

    //START_ROYALTY_LOGIC
    /**@dev EIP2981 royalties implementation. */

    // Maintain flexibility to modify royalties recipient (could also add basis points).
    function _setRoyalties(address newRecipient) internal {
        require(newRecipient != address(0), "Royalties: new recipient is the zero address");
        royaltyRecipient = newRecipient;
    }

    function setRoyalties(address newRecipient) external onlyOwner {
        _setRoyalties(newRecipient);
    }

    // EIP2981 standard royalties return.
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view override
        returns (address receiver, uint256 royaltyAmount)
    {
        return (royaltyRecipient, (_salePrice * royaltyFeeBasisPoints) / 10000);
    }

    // EIP2981 standard Interface return. Adds to ERC721 and ERC165 Interface returns.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, IERC165)
        returns (bool)
    {
        return (
            interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(interfaceId)
        );
    }
    //END_ROYALTY_LOGIC
}