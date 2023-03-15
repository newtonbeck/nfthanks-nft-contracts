import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { deploy } from "./tasks/deploy";
import { mint } from "./tasks/mint";

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
};

export default config;
