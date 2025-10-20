js/crash-game.js

javascript
class CrashGame {
    constructor() {
        this.multiplier = 1.00;
        this.isRunning = false;
        this.players = [];
        this.cashedOut = [];
    }

    startGame() {
        this.isRunning = true;
        this.multiplier = 1.00;
        this.cashedOut = [];
        this.simulateGame();
    }

    simulateGame() {
        const gameLoop = setInterval(() => {
            if (!this.isRunning) {
                clearInterval(gameLoop);
                return;
            }

            // Increase multiplier with random volatility
            const volatility = 0.02 + Math.random() * 0.03;
            this.multiplier += volatility;
            
            // Update UI
            this.updateGameDisplay();

            // Random crash point (1.5x to 10x)
            if (this.multiplier > (1.5 + Math.random() * 8.5)) {
                this.crash();
                clearInterval(gameLoop);
            }
        }, 100);
    }

    crash() {
        this.isRunning = false;
        // Process player winnings
        this.processResults();
        // Show crash animation
        this.showCrashEffect();
        
        // Restart after 5 seconds
        setTimeout(() => this.startGame(), 5000);
    }

    placeBet(player, amount) {
        this.players.push({
            address: player,
            bet: amount,
            cashedOut: false,
            cashoutMultiplier: 1.00
        });
    }

    cashOut(player) {
        const playerObj = this.players.find(p => p.address === player && !p.cashedOut);
        if (playerObj && this.isRunning) {
            playerObj.cashedOut = true;
            playerObj.cashoutMultiplier = this.multiplier;
            this.cashedOut.push(playerObj);
            
            // Calculate winnings
            const winnings = playerObj.bet * this.multiplier;
            this.processWinnings(player, winnings);
        }
    }

    updateGameDisplay() {
        const multiplierElement = document.getElementById('current-multiplier');
        const playersElement = document.getElementById('active-players');
        
        if (multiplierElement) {
            multiplierElement.textContent = this.multiplier.toFixed(2) + 'x';
            multiplierElement.style.color = this.getMultiplierColor(this.multiplier);
        }
        
        if (playersElement) {
            playersElement.textContent = this.players.filter(p => !p.cashedOut).length;
        }
    }

    getMultiplierColor(multiplier) {
        if (multiplier < 2) return '#00ff00';
        if (multiplier < 5) return '#ffff00';
        return '#ff0000';
    }

    showCrashEffect() {
        // Add explosion animation
        const explosion = document.createElement('div');
        explosion.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, #ff0000, #ff8800, transparent);
            border-radius: 50%;
            animation: explode 0.5s ease-out;
            z-index: 1000;
        `;
        
        document.body.appendChild(explosion);
        setTimeout(() => explosion.remove(), 500);
    }
}

// Initialize Crash Game
const crashGame = new CrashGame();

// VR Jump Cash-out Detection
function setupVRCashOut() {
    let jumpDetected = false;
    
    // Simulate VR jump detection (this would integrate with actual VR hardware)
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && crashGame.isRunning) {
            // Space bar simulates VR jump for testing
            handleVRCashOut();
        }
    });
    
    // VR headset integration would go here
    if (navigator.xr) {
        // WebXR session for jump detection
        console.log('WebXR supported - VR jump detection available');
    }
}

function handleVRCashOut() {
    const playerAddress = getConnectedWallet(); // Get from Web3 connection
    if (playerAddress && crashGame.isRunning) {
        crashGame.cashOut(playerAddress);
        showNotification('VR Cash Out Successful!', 'success');
        
        // Add VR-specific effects
        addVRCashOutEffects();
    }
}

function addVRCashOutEffects() {
    // VR-specific celebration effects
    const effects = document.createElement('div');
    effects.innerHTML = `
        <div class="vr-celebration">
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
        </div>
    `;
    document.body.appendChild(effects);
}