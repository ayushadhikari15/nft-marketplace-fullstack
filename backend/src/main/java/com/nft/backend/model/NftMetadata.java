package com.nft.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "nfts")
public class NftMetadata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String imageUrl;
    private Long tokenId;
    private String ownerAddress;

    // --- CONSTRUCTORS ---
    public NftMetadata() {}

    public NftMetadata(String name, String description, String imageUrl, Long tokenId, String ownerAddress) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.tokenId = tokenId;
        this.ownerAddress = ownerAddress;
    }

    // --- MANUAL GETTERS & SETTERS (Zaroori hain) ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Long getTokenId() { return tokenId; }
    public void setTokenId(Long tokenId) { this.tokenId = tokenId; }

    public String getOwnerAddress() { return ownerAddress; }
    public void setOwnerAddress(String ownerAddress) { this.ownerAddress = ownerAddress; }
}