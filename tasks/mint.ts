import { HardhatRuntimeEnvironment } from "hardhat/types";

interface MintArgs {
    contractAddress: string
    toAddress: string
    ipfsCid: string
}

export const mint = async ({ contractAddress, toAddress, ipfsCid }: MintArgs, hre: HardhatRuntimeEnvironment) => {
    console.log(`🔌 Connecting to contract at ${contractAddress}`);
    const contract = await hre.ethers.getContractAt("NFThanks", contractAddress);

    console.log(`🛠 Minting NTF to ${toAddress} with IPFS CID ${ipfsCid}`);
    const transaction = await contract.safeMint(
        toAddress,
        ipfsCid
    );

    const transactionReceipt = await transaction.wait();

    console.log(`NFT successfully minted at block ${transactionReceipt.blockNumber}`);
};
