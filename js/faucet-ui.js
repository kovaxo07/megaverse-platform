// Simple Faucet UI that uses window.MegaverseFaucet if available
(async function() {
    const btn = document.getElementById('claimFaucetBtn');
    const status = document.getElementById('faucetStatus');
    if (!btn || !status) return;

    async function updateStatus(msg) {
        status.textContent = msg;
    }

    btn.addEventListener('click', async () => {
        btn.disabled = true;
        await updateStatus('Checking eligibility...');
        try {
            const userId = 'demo-user'; // replace with real user id/wallet address
            if (window.MegaverseFaucet) {
                const can = await window.MegaverseFaucet.canUserClaim(userId);
                if (!can) {
                    await updateStatus('Faucet on cooldown or not eligible.');
                    btn.disabled = false;
                    return;
                }
                const result = await window.MegaverseFaucet.claimFaucet(userId);
                await updateStatus(`Success! Claimed ${result.reward} demo tokens.`);
            } else {
                await updateStatus('Faucet not available (client placeholder).');
            }
        } catch (err) {
            console.error(err);
            await updateStatus('Error claiming faucet. See console for details.');
        }
        btn.disabled = false;
    });
})();
