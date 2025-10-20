// Main Megaverse Platform JavaScript

// Wallet Connection Functionality
async function connectWallet() {
    try {
        // Check if Web3 is available
        if (typeof window.ethereum !== 'undefined') {
            console.log('Web3 wallet detected');
            
            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            
            const account = accounts[0];
            console.log('Connected account:', account);
            
            // Show success message
            showNotification(`Wallet connected: ${account.substring(0, 6)}...${account.substring(38)}`);
            
            // Enable Web3 features
            enableWeb3Features(account);
            
        } else {
            showNotification('Please install MetaMask or another Web3 wallet to connect', 'error');
        }
    } catch (error) {
        console.error('Wallet connection error:', error);
        showNotification('Failed to connect wallet', 'error');
    }
}

// Enable Web3 features after wallet connection
function enableWeb3Features(account) {
    // Update UI to show connected state
    const connectButton = document.querySelector('.cta-button.primary');
    if (connectButton) {
        connectButton.textContent = `Connected: ${account.substring(0, 6)}...`;
        connectButton.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
    }
    
    // Show DAB token balance (placeholder for now)
    loadTokenBalance(account);
}

// Load token balance (placeholder implementation)
async function loadTokenBalance(account) {
    // This will be implemented with actual DAB101 token contract
    console.log('Loading token balance for:', account);
    // TODO: Integrate with DAB101 smart contract
}

// VR Entry Function
function enterVR() {
    showNotification('VR experience launching soon...', 'info');
    // TODO: Integrate with WebXR API
    // This will launch the immersive VR environment
}

// Show token information
function showTokenInfo() {
    const tokenInfo = `
        $DAB101 Token Utility:
        • In-platform purchases and betting
        • Staking for casino profit sharing
        • Governance voting rights
        • Merchant payouts and rewards
        • Arcade and arena access
        
        Tokenomics:
        Total Supply: 1,000,000,000 DAB
        Platform Rewards: 40%
        Staking Pool: 25%
        Team & Development: 15%
        Liquidity: 10%
        Community & Marketing: 10%
    `;
    
    alert(tokenInfo);
}

// Notification System
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'error' ? '#ff4444' : type === 'info' ? '#2196F3' : '#4CAF50'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form[data-netlify="true"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            showNotification('Submitting application...', 'info');
            // Netlify will handle the form submission
        });
    });
});

// Initialize platform when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('The Megaverse Platform initialized');
    
    // Check if Web3 is already connected
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_accounts' })
            .then(accounts => {
                if (accounts.length > 0) {
                    enableWeb3Features(accounts[0]);
                }
            });
    }
});
