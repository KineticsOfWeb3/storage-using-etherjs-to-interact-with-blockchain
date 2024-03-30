const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function deployContract() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const abi = fs.readFileSync("./AdvancedStorage_sol_AdvancedStorage.abi", "utf8");
    const binary = fs.readFileSync("./AdvancedStorage_sol_AdvancedStorage.bin", "utf8");

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

    console.log("Deploying contract, please wait...");

    const contract = await contractFactory.deploy();
    const deploymentReceipt = await contract.deployTransaction.wait(1);

    console.log(`Contract deployed to address: ${contract.address}`);

    let currentTotalSupply = await contract.getTotalSupply();
    console.log(`Current Total Supply: ${currentTotalSupply}`);

    console.log("Updating total supply...");
    await contract.updateTotalSupply(1000);
    currentTotalSupply = await contract.getTotalSupply();
    console.log(`New Total Supply: ${currentTotalSupply}`);

    console.log("Adding new item...");
    await contract.addItem("Item A", 10);
    console.log("Item added successfully");

    console.log("Retrieving item details...");
    const itemCount = await contract.getItemCount();
    for (let i = 0; i < itemCount; i++) {
        const [name, quantity] = await contract.getItem(i);
        console.log(`Item ${i + 1}: Name - ${name}, Quantity - ${quantity}`);
    }
}

deployContract()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
