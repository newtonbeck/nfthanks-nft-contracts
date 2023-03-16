import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import { deploy } from "./tasks/deploy";
import { mint } from "./tasks/mint";
import "dotenv/config";

task("deploy")
  .setDescription("Deploys the contract to the blockchain")
  .setAction(async (_, hre) => deploy(hre));

task("mint")
  .addParam("contractAddress", "NFThanks contract's address")
  .addParam("toAddress", "Address to whom the NFT will be minted to")
  .addParam("ipfsCid", "IPFS CID which reprsents the NFT JSON metadata")
  .setAction(async (args, hre) => mint(args, hre));

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    mumbai: {
      url: process.env.MUMBAI_ALCHEMY_NODE_URL_WITH_API_KEY,
      accounts: [process.env.MUMBAI_SIGNER_PRIVATE_KEY || ""]
    },
    polygon: {
      url: process.env.POLYGON_ALCHEMY_NODE_URL_WITH_API_KEY,
      accounts: [process.env.POLYGON_SIGNER_PRIVATE_KEY || ""]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  }
};

export default config;
