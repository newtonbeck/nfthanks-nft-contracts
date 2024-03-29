// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @custom:security-contact newtonbeck@gmail.com
contract NFThanks is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    /// Error thrown when an account attempts
    /// to transfer a non-transferrable NFT
    error NonTransferableNFT(address from, address to, uint256 tokenId);

    /// Error thrown when an account attempts
    /// to approve a non-approvable NFT
    error NonApprovableNFT(address to, uint256 tokenId);

    /// Error thrown when an account attempts
    /// to approve a non-approvable NFT for all
    error NonApprovableForAllNFT(address to, bool approved);

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("NFThanks", "NFTH") {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following overrided functions prevent accounts to transfer/approve their NFTs

    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal pure override(ERC721) {
        revert NonTransferableNFT(from, to, tokenId);
    }

    function _approve(address to, uint256 tokenId) internal pure override(ERC721) {
        revert NonApprovableNFT(to, tokenId);
    }

    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal pure override(ERC721) {
        revert NonApprovableForAllNFT(operator, approved);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
