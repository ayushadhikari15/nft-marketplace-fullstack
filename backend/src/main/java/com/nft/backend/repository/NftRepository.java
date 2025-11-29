package com.nft.backend.repository;

import com.nft.backend.model.NftMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NftRepository extends JpaRepository<NftMetadata, Long> {
    // Basic CRUD operations already included!
}