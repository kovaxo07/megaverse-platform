const { ethers } = require("hardhat");

async function main() {
  const contractAddress = process.argv[2];
  
  if (!contractAddress) {
    console.log("Usage: hardhat run scripts/verify.js --network <network> <contract-address>");
    process.exit(1);
  }

  console.log(`🔍 Verifying contract at ${contractAddress}...`);

  try {
    await hre.run("verify:verify", {
      address: contractAddress,
    });
    console.log("✅ Contract verified successfully!");
  } catch (error) {
    console.error("❌ Verification failed:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });