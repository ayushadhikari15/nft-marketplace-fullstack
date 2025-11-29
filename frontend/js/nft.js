// frontend/js/nft.js

async function mintNFT() {
    // 1. Check if wallet is connected
    if (!signer) {
        await connectWallet();
        if (!signer) return;
    }

    // Get Input Values
    const name = document.getElementById("nftName").value;
    const desc = document.getElementById("nftDescription").value;
    const image = document.getElementById("nftImage").value;
    const status = document.getElementById("status");

    // Simple Validation
    if (!name || !image) {
        alert("Please enter a Name and Image URL!");
        return;
    }

    try {
        status.innerText = "⏳ Step 1: Uploading Metadata (Fake IPFS)...";
        
        // --- 1. PREPARE METADATA ---
        // (Real world mein hum yahan Pinata API use karte hain)
        const metadata = {
            name: name,
            description: desc,
            image: image
        };
        // Metadata ko ek encoded string bana rahe hain
        const tokenURI = "data:application/json;base64," + btoa(JSON.stringify(metadata));

        status.innerText = "🦊 Step 2: Confirm Transaction in MetaMask...";

        // --- 2. BLOCKCHAIN TRANSACTION ---
        const nftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
        
        // Mint function call
        const tx = await nftContract.mintNft(userAddress, tokenURI);
        
        status.innerText = "⏳ Minting in progress... Please wait.";
        
        // Wait for transaction to finish (Mining)
        const receipt = await tx.wait();
        
        // --- 3. EXTRACT TOKEN ID ---
        // Transfer Event: Topic[1]=From, Topic[2]=To, Topic[3]=TokenID
        // Hum hex convert karke integer nikal rahe hain
        const tokenId = parseInt(receipt.logs[0].topics[3], 16);

        console.log("Minted Token ID:", tokenId);
        status.innerText = `✅ Minted on Blockchain! ID: ${tokenId}. Saving to Database...`;

        // --- 4. SAVE TO JAVA BACKEND ---
        const backendData = {
            name: name,
            description: desc,
            imageUrl: image,
            tokenId: tokenId,
            ownerAddress: userAddress
        };

        const response = await fetch("http://localhost:8080/api/nfts/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(backendData)
        });

        if (!response.ok) {
            throw new Error("Failed to save to Java Backend");
        }

        // --- 5. SUCCESS ---
        status.innerText = `🎉 Success! NFT #${tokenId} Saved to DB & Blockchain.`;
        status.style.color = "#2ecc71"; // Green color
        
        alert(`NFT Minted Successfully! Token ID: ${tokenId}`);

    } catch (error) {
        console.error(error);
        status.innerText = "❌ Error: " + error.message;
        status.style.color = "red";
    }
}