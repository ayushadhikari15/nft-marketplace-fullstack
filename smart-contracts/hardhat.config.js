require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Yeh line add karein

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    // Future mein jab asli internet pe dalenge tab yeh use hoga:
    // sepolia: {
    //   url: "...",
    //   accounts: [process.env.PRIVATE_KEY] <--- Aise secure rehta hai
    // }
  },
};