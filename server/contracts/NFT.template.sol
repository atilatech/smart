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
    address private royalty_recipient;
    uint256 private royalty_fee_basis_points;
    //__MAX_SUPPLY_COUNT__
    //__EXAMPLE__ uint256 public constant maxSupply = 2;

    event NFTMinted (
        uint256 indexed tokenId,
        string tokenURI
    );

    constructor(address default_royalty_recipient, uint256 default_royalty_fee_basis_points) 
    ERC721("__CONTRACT_NAME__", "__CONTRACT_SYMBOL__") {
        royalty_recipient = default_royalty_recipient;
        royalty_fee_basis_points = default_royalty_fee_basis_points;
    }

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

    //START_ROYALTY_LOGIC
    /**@dev EIP2981 royalties implementation. */

    // Maintain flexibility to modify royalties recipient (could also add basis points).
    function _setRoyalties(address newRecipient) internal {
        require(newRecipient != address(0), "Royalties: new recipient is the zero address");
        royalty_recipient = newRecipient;
    }

    function setRoyalties(address newRecipient) external onlyOwner {
        _setRoyalties(newRecipient);
    }

    // EIP2981 standard royalties return.
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view override
        returns (address receiver, uint256 royaltyAmount)
    {
        return (royalty_recipient, (_salePrice * royalty_fee_basis_points) / 10000);
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