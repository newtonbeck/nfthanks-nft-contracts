import { HardhatRuntimeEnvironment } from "hardhat/types";

export const deploy = async (hre: HardhatRuntimeEnvironment) => {
    console.log("Deploying contract to blockchain 🏃‍♂️");

    const factory = await hre.ethers.getContractFactory("NFThanks");
    const contract = await factory.deploy();
    await contract.deployed();

    console.log(`Contract successfully deployed at address ${contract.address} 🚀`);
}
