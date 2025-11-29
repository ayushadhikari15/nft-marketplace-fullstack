const hre = require("hardhat");

async function main() {
  console.log("Deploying contracts...");

  // 1. Deploy NftToken
  const NftToken = await hre.ethers.getContractFactory("NftToken");
  const nftToken = await NftToken.deploy();
  await nftToken.waitForDeployment();
  console.log("NftToken deployed to:", await nftToken.getAddress());

  // 2. Deploy Marketplace
  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy();
  await marketplace.waitForDeployment();
  console.log("Marketplace deployed to:", await marketplace.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});