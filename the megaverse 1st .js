 js/web3-enhanced.js

javascript
// Enhanced Web3 Integration for DAB101 Token
class MegaverseWeb3 {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.dabContract = null;
        this.casinoContract = null;
    }

    async initialize() {
        if (typeof window.ethereum !== 'undefined') {
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            this.signer = this.provider.getSigner();
            
            // Initialize DAB101 Contract (replace with actual address)
            const dabAddress = "0x..."; // Your DAB101 contract address
            const dabABI = [...]; // Your DAB101 ABI
            
            this.dabContract = new ethers.Contract(dabAddress, dabABI, this.signer);
            
            await this.loadTokenInfo();
        }
    }

    async loadTokenInfo() {
        try {
            const address = await this.signer.getAddress();
            const balance = await this.dabContract.balanceOf(address);
            const formattedBalance = ethers.utils.formatUnits(balance, 18);
            
            this.updateTokenDisplay(formattedBalance);
        } catch (error) {
            console.error('Error loading token info:', error);
        }
    }

    async purchaseTokens(amount) {
        try {
            // Implementation for purchasing DAB101 tokens
            const tx = await this.dabContract.mint(amount);
            await tx.wait();
            showNotification('Tokens purchased successfully!', 'success');
        } catch (error) {
            console.error('Token purchase error:', error);
            showNotification('Token purchase failed', 'error');
        }
    }

    async placeCasinoBet(gameType, amount) {
        try {
            // Approve casino contract to spend tokens
            const approveTx = await this.dabContract.approve(this.casinoContract.address, amount);
            await approveTx.wait();
            
            // Place bet
            const betTx = await this.casinoContract.placeBet(gameType, amount);
            await betTx.wait();
            
            return true;
        } catch (error) {
            console.error('Bet placement error:', error);
            return false;
        }
    }
}

// Enhanced Wallet Connection with Multiple Providers
async function connectEnhancedWallet() {
    try {
        // Check for multiple wallet providers
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            showNotification('MetaMask connected!', 'success');
        } else if (window.web3) {
            showNotification('Web3 wallet detected', 'info');
        } else {
            // Offer wallet download links
            showWalletOptions();
        }
    } catch (error) {
        console.error('Wallet connection failed:', error);
    }
}

function showWalletOptions() {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div class="wallet-modal">
            <h3>Connect Your Wallet</h3>
            <p>Choose your preferred Web3 wallet:</p>
            <div class="wallet-options">
                <button onclick="installMetaMask()">MetaMask</button>
                <button onclick="installWalletConnect()">WalletConnect</button>
                <button onclick="installCoinbase()">Coinbase Wallet</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}