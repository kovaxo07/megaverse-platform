// Minimal placeholder script for new index.html

function connectWallet() {
    const btn = document.querySelector('.cta-button.primary');
    if (!btn) return;
    btn.disabled = true;
    const prev = btn.textContent;
    btn.textContent = 'Connecting...';
    setTimeout(() => {
        btn.textContent = 'Connected';
    }, 800);
}

function enterVR() {
    // Placeholder: in a real app we'd call WebXR APIs or enter immersive session
    alert('Enter VR Experience — placeholder (WebXR integration required)');
}

function showTokenInfo() {
    alert('$DAB101 token: utility token for transactions, staking and in-world governance (placeholder)');
}
