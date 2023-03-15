import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { deploy } from "./tasks/deploy";

task("deploy")
  .setDescription("Deploys the contract to the blockchain")
  .setAction(async (_, hre) => deploy(hre));

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
