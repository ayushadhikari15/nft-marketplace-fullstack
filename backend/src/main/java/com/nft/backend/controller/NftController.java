package com.nft.backend.controller;

import com.nft.backend.model.NftMetadata;
import com.nft.backend.repository.NftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nfts")
@CrossOrigin(origins = "*") // <--- YEH LINE SABSE ZAROORI HAI
public class NftController {

    @Autowired
    private NftRepository nftRepository;

    @PostMapping("/save")
    public NftMetadata saveNft(@RequestBody NftMetadata metadata) {
        return nftRepository.save(metadata);
    }

    @GetMapping
    public List<NftMetadata> getAllNfts() {
        return nftRepository.findAll();
    }
}