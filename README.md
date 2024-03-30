# storage-using-etherjs-to-interact-with-blockchain
This project embodies decentralized storage, providing a secure solution on the blockchain. Utilizing Solidity's versatility and Ether.js, a JavaScript library enabling seamless blockchain interaction, it epitomizes cutting-edge blockchain technology.
# Decentralized Storage with Blockchain

## Getting Started

### Requirements
- git
- Node.js
- Yarn (recommended over npm)
- Ganache (or ganache-cli / hardhat)

### Usage
1. Run your local Ganache chain.
2. Save the workspace for future use.
3. **IMPORTANT**: Use a MetaMask wallet without real funds to avoid accidental exposure of private keys.
4. Export your private key and place it in the `.env` file.
5. Create a new project on your chosen testnet (e.g., Sepolia) using Alchemy.
6. Copy the testnet URL into your `.env` file.
7. Ensure your MetaMask wallet has testnet ETH.
8. Run `node deploy.js`.

## Troubleshooting
If encountering issues with Ethers 6.X.X instability:
- Update code to reflect Ethers v6 migration.
- Alternatively, downgrade to a stable version like Ethers 5.7.2:
  - For yarn users: `yarn add ethers@5.7.2`.
