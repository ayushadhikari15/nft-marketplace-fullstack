// frontend/js/marketplace.js

// --- 1. LIST NFT ON BLOCKCHAIN (Existing Logic) ---
async function listNFT() {
    if (!signer) { await connectWallet(); }

    const tokenId = document.getElementById("sellTokenId").value;
    const priceEth = document.getElementById("sellPrice").value;
    const status = document.getElementById("listStatus");

    if (!tokenId || !priceEth) {
        alert("Please enter Token ID and Price");
        return;
    }

    try {
        status.innerText = "⏳ Step 1: Approving Market...";
        const priceWei = ethers.parseEther(priceEth);
        const nftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
        const marketContract = new ethers.Contract(MARKETPLACE_ADDRESS, MARKETPLACE_ABI, signer);

        const approveTx = await nftContract.approve(MARKETPLACE_ADDRESS, tokenId);
        await approveTx.wait();

        status.innerText = "⏳ Step 2: Listing...";
        const listTx = await marketContract.listNft(NFT_ADDRESS, tokenId, priceWei);
        await listTx.wait();

        status.innerText = "✅ Listed Successfully!";
        status.style.color = "#2ecc71";
        
        loadListings(); // Refresh UI after listing

    } catch (error) {
        console.error(error);
        status.innerText = "❌ Error: " + error.message;
        status.style.color = "red";
    }
}

// --- 2. LOAD NFTS FROM JAVA BACKEND (Updated Display Logic) ---
async function loadListings() {
    const grid = document.getElementById("marketplaceGrid");
    
    // Show Loading State
    grid.innerHTML = "<p style='color:#a4b0be; grid-column: 1/-1; text-align:center;'>Loading NFTs from Database...</p>";

    try {
        // Fetch Data from Backend
        const response = await fetch("http://localhost:8080/api/nfts");

        if (!response.ok) {
            throw new Error("Backend connection failed");
        }

        const nfts = await response.json();
        
        // Debugging: Console mein data check karein
        console.log("NFT Data:", nfts);

        grid.innerHTML = ""; // Clear loader

        // Empty State
        if (nfts.length === 0) {
            grid.innerHTML = `
                <div style="text-align:center; grid-column: 1/-1; padding: 40px;">
                    <h3 style="color: white;">No NFTs found 😢</h3>
                    <p style="color: #a4b0be;">Go to the 'Mint' page to create one!</p>
                </div>
            `;
            return;
        }

        // Render Cards
        nfts.forEach(nft => {
            // --- SAFETY CHECKS (Undefined Fixes) ---
            const name = nft.name || "Unnamed NFT";
            const desc = nft.description || "No description provided.";
            const image = nft.imageUrl || "https://via.placeholder.com/300?text=No+Image";
            const id = nft.tokenId !== null ? nft.tokenId : "N/A";
            
            // Handle Owner Address safely
            let ownerDisplay = "Unknown";
            if (nft.ownerAddress) {
                const addr = nft.ownerAddress;
                ownerDisplay = addr.substring(0, 6) + "..." + addr.substring(addr.length - 4);
            }
            // ----------------------------------------

            // Create Card HTML
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <img src="${image}" alt="${name}" onerror="this.src='https://via.placeholder.com/300?text=Error+Loading+Image'">
                
                <div class="card-body">
                    <h3>${name}</h3>
                    <p class="desc">${desc}</p>
                    
                    <div class="card-info">
                        <span class="badge">#${id}</span>
                        <span class="owner">Owner: ${ownerDisplay}</span>
                    </div>

                    <button onclick="buyNFT(${id})">View Details</button>
                </div>
            `;
            grid.appendChild(card);
        });

    } catch (error) {
        console.error("Load Error:", error);
        grid.innerHTML = `
            <div style='color:red; text-align:center; grid-column: 1/-1;'>
                <h3>⚠️ Connection Error</h3>
                <p>Failed to load data from Java Backend.</p>
                <small>${error.message}</small>
            </div>
        `;
    }
}

// Placeholder Buy Function
async function buyNFT(id) {
    alert(`Buying feature coming soon for Token ID: ${id}`);
}

// Auto Load on Page Start
window.addEventListener('load', () => {
    setTimeout(loadListings, 500);
});