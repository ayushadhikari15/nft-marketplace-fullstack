// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftToken is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    event NftMinted(address indexed minter, uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("MarketplaceNFT", "MNFT") Ownable(msg.sender) {}

    function mintNft(address recipient, string memory tokenURI) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit NftMinted(recipient, tokenId, tokenURI);
        return tokenId;
    }
}