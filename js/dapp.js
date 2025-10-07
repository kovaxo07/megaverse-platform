// Safe Web3 / DAB101 contract helper
// Replace dabABI and dabAddress with real values before enabling contract interactions

const dabABI = []; // TODO: paste DAB101 ABI JSON array here
const dabAddress = ''; // TODO: set DAB101 contract address

async function hasEthers() {
    return !!window.ethers;
}

async function ensureProvider() {
    if (typeof window.ethereum === 'undefined') {
        console.warn('No Web3 provider detected (MetaMask).');
        return null;
    }
    if (!window.ethers) {
        console.warn('Ethers.js not available on window. Include Ethers via script tag or bundle it.');
        return null;
    }
    const provider = new window.ethers.providers.Web3Provider(window.ethereum);
    return provider;
}

async function initDABContract() {
    const provider = await ensureProvider();
    if (!provider) return null;

    if (!Array.isArray(dabABI) || dabABI.length === 0) {
        console.warn('DAB101 ABI missing — contract interaction disabled until ABI is provided.');
        return null;
    }
    if (!dabAddress) {
        console.warn('DAB101 contract address missing — set dabAddress in js/dapp.js');
        return null;
    }

    const signer = provider.getSigner();
    try {
        const contract = new window.ethers.Contract(dabAddress, dabABI, signer);
        return { provider, signer, contract };
    } catch (err) {
        console.error('Error creating DAB contract instance:', err);
        return null;
    }
}

// Export safe helpers for other scripts
window.dappHelpers = { ensureProvider, initDABContract, hasEthers };

export { ensureProvider, initDABContract, hasEthers };
