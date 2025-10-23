const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("🚀 Starting DAB101 Megaverse deployment...");

  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", ethers.utils.formatEther(await deployer.getBalance()));

  // Deploy DAB101 Token
  console.log("\n📄 Deploying DAB101Token...");
  const DAB101Token = await ethers.getContractFactory("DAB101Token");
  const dab101Token = await DAB101Token.deploy();
  await dab101Token.deployed();
  console.log("✅ DAB101Token deployed to:", dab101Token.address);

  // Deploy StakingPool
  console.log("\n💰 Deploying StakingPool...");
  const StakingPool = await ethers.getContractFactory("StakingPool");
  const stakingPool = await StakingPool.deploy(dab101Token.address);
  await stakingPool.deployed();
  console.log("✅ StakingPool deployed to:", stakingPool.address);

  // Deploy MerchantEscrow
  console.log("\n🏪 Deploying MerchantEscrow...");
  const MerchantEscrow = await ethers.getContractFactory("MerchantEscrow");
  const merchantEscrow = await MerchantEscrow.deploy(dab101Token.address);
  await merchantEscrow.deployed();
  console.log("✅ MerchantEscrow deployed to:", merchantEscrow.address);

  // Deploy GovernanceDAO
  console.log("\n🗳️  Deploying GovernanceDAO...");
  const GovernanceDAO = await ethers.getContractFactory("GovernanceDAO");
  const governanceDAO = await GovernanceDAO.deploy(dab101Token.address);
  await governanceDAO.deployed();
  console.log("✅ GovernanceDAO deployed to:", governanceDAO.address);

  // Save addresses to JSON
  const addresses = {
    DAB101Token: dab101Token.address,
    StakingPool: stakingPool.address,
    MerchantEscrow: merchantEscrow.address,
    GovernanceDAO: governanceDAO.address,
    deployer: deployer.address,
    network: await ethers.provider.getNetwork(),
    timestamp: new Date().toISOString(),
  };

  // Write to docs/ADDRESSES.json
  const docsPath = "../docs/ADDRESSES.json";
  fs.writeFileSync(docsPath, JSON.stringify(addresses, null, 2));
  console.log(`\n📋 Addresses saved to ${docsPath}`);

  // Display summary
  console.log("\n🎉 DEPLOYMENT COMPLETE!");
  console.log("═══════════════════════════════════════");
  console.log("DAB101Token:    ", dab101Token.address);
  console.log("StakingPool:    ", stakingPool.address);
  console.log("MerchantEscrow: ", merchantEscrow.address);
  console.log("GovernanceDAO:  ", governanceDAO.address);
  console.log("═══════════════════════════════════════");
  
  console.log("\n🔧 Next Steps:");
  console.log("1. Update frontend NEXT_PUBLIC_DAB_TOKEN:", dab101Token.address);
  console.log("2. Update backend with contract addresses");
  console.log("3. Verify contracts on PolygonScan (optional)");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });