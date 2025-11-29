// --- CONFIGURATION ---
// Apne deploy kiye gaye addresses yahan paste karein:
const NFT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
const MARKETPLACE_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; 

// Hum Contract ke sirf wahi functions likhenge jo humein chahiye (Minimal ABI)
const NFT_ABI = [
    "function mintNft(address recipient, string memory tokenURI) public returns (uint256)",
    "function tokenURI(uint256 tokenId) public view returns (string memory)",
    "function approve(address to, uint256 tokenId) public",
    "event NftMinted(address indexed minter, uint256 indexed tokenId, string tokenURI)"
];

const MARKETPLACE_ABI = [
    "function listNft(address _nftContract, uint256 _tokenId, uint256 _price) external",
    "function buyNft(uint256 _listingId) external payable",
    "function listings(uint256) view returns (uint256 listingId, address seller, address nftContract, uint256 tokenId, uint256 price, bool active)",
    "event ItemListed(uint256 indexed listingId, address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price)"
];

// --- WALLET CONNECTION ---
let provider;
let signer;
let userAddress;

async function connectWallet() {
    if (window.ethereum) {
        try {
            // Ethers.js v6 setup
            provider = new ethers.BrowserProvider(window.ethereum);
            signer = await provider.getSigner();
            userAddress = await signer.getAddress();

            console.log("Connected to:", userAddress);

            // UI update karna
            const btn = document.getElementById("connectWalletBtn");
            const addrSpan = document.getElementById("walletAddress");
            
            if (btn) {
                btn.innerText = "Connected";
                btn.style.backgroundColor = "#2ecc71"; // Green color
            }
            if (addrSpan) {
                addrSpan.innerText = userAddress.substring(0, 6) + "..." + userAddress.substring(38);
                addrSpan.style.marginLeft = "10px";
            }
            
            return signer;
        } catch (error) {
            console.error("Connection failed:", error);
            alert("Wallet connection failed!");
        }
    } else {
        alert("Please install MetaMask!");
        window.open("https://metamask.io/download/", "_blank");
    }
}

// Check if wallet is already connected on page load
window.onload = async () => {
    if(window.ethereum) {
        const accounts = await window.ethereum.request({method: 'eth_accounts'});
        if(accounts.length > 0) {
            connectWallet();
        }
    }
};