# 🎨 Decentralized NFT Marketplace

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)
![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

A full-stack **Decentralized Application (DApp)** that allows users to Mint, List, and Buy NFTs.
This project demonstrates a **Hybrid Architecture** by combining the security of **Blockchain (Ethereum)** with the speed of a **Java Spring Boot Backend**.

---

## 🏗️ Architecture

The application uses a **Dual-Storage Strategy**:
1.  **On-Chain (Blockchain):** Stores ownership, token transfer logic, and transaction history using **ERC-721 Smart Contracts**.
2.  **Off-Chain (Java Backend):** Stores metadata (Names, Descriptions, Images) for fast retrieval and querying using **H2 Database**.

### ⚡ Tech Stack

* **Smart Contracts:** Solidity, Hardhat, OpenZeppelin (ERC-721).
* **Backend:** Java 21, Spring Boot 3, Spring Data JPA, H2 Database.
* **Frontend:** HTML5, CSS3 (Custom Dark Theme), Vanilla JavaScript.
* **Web3 Integration:** Ethers.js, MetaMask.

---

## 🚀 Features

* **🦊 Wallet Connection:** Seamless integration with MetaMask.
* **🎨 Minting:** Users can create unique NFTs with metadata.
* **🔄 Database Sync:** Automatically syncs minted NFTs to the Java Backend for display.
* **💰 Marketplace:** List NFTs for sale and buy them using (Test) ETH.
* **🛡️ Secure:** Uses OpenZeppelin standards for secure token transfers.

---

## 🛠️ Local Setup Guide

Follow these steps to run the project locally.

### 1. Prerequisites
* Node.js & npm
* Java JDK 21
* MetaMask Extension (Browser)
