// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
    
    struct Listing {
        uint256 listingId;
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    uint256 private _listingIdCounter;
    mapping(uint256 => Listing) public listings;

    event ItemListed(uint256 indexed listingId, address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price);
    event ItemBought(uint256 indexed listingId, address indexed buyer, uint256 price);

    // 1. List NFT for sale
    function listNft(address _nftContract, uint256 _tokenId, uint256 _price) external nonReentrant {
        require(_price > 0, "Price must be greater than 0");
        
        // Transfer NFT from Seller to Marketplace Contract
        IERC721(_nftContract).transferFrom(msg.sender, address(this), _tokenId);

        _listingIdCounter++;
        listings[_listingIdCounter] = Listing(
            _listingIdCounter,
            msg.sender,
            _nftContract,
            _tokenId,
            _price,
            true
        );

        emit ItemListed(_listingIdCounter, msg.sender, _nftContract, _tokenId, _price);
    }

    // 2. Buy NFT
    function buyNft(uint256 _listingId) external payable nonReentrant {
        Listing storage listing = listings[_listingId];
        require(listing.active, "Listing is not active");
        require(msg.value >= listing.price, "Insufficient payment");

        listing.active = false;

        // Pay the Seller
        payable(listing.seller).transfer(listing.price);

        // Transfer NFT to Buyer
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        emit ItemBought(_listingId, msg.sender, listing.price);
    }
}