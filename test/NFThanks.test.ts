import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFThanks", function () {
  
  describe("deploy", () => {
    it("it should have the proper name", async function () {
      const factory = await ethers.getContractFactory("NFThanks");
      const contract = await factory.deploy();
      await contract.deployed();
  
      expect(await contract.name()).to.equal("NFThanks");
    });

    it("it should have the proper symbol", async function () {
      const factory = await ethers.getContractFactory("NFThanks");
      const contract = await factory.deploy();
      await contract.deployed();
  
      expect(await contract.symbol()).to.equal("NFTH");
    });
  });

  describe("transfer", () => {
    it("it should not allow accounts to transfer their NFTs", async () => {
      const [_, alice, bob] = await ethers.getSigners();

      const factory = await ethers.getContractFactory("NFThanks");
      const contract = await factory.deploy();
      await contract.deployed();

      // The contract owner mints a NFT to Alice
      await contract.safeMint(
        alice.address, 
        "ipfs://Qmdfq7EyShQn5ArMphtSfYt5YRkB2G4f2raP1gLfz1kW8Z"
      );

      // Alice attempts to transfer her NFT to Bob
      await expect(
        contract.connect(alice).transferFrom(
          alice.address,
          bob.address,
          0
        )
      ).to.be.revertedWithCustomError(contract, "NonTransferableNFT");
    });
  });

  describe("approve", () => {
    it("it should not allow accounts to approve other accounts to use their NFTs", async () => {
      const [_, alice, bob] = await ethers.getSigners();

      const factory = await ethers.getContractFactory("NFThanks");
      const contract = await factory.deploy();
      await contract.deployed();

      // The contract owner mints a NFT to Alice
      await contract.safeMint(
        alice.address, 
        "ipfs://Qmdfq7EyShQn5ArMphtSfYt5YRkB2G4f2raP1gLfz1kW8Z"
      );

      // Alice attempts to approve Bob to "use" her NFT
      await expect(
        contract.connect(alice).approve(
          bob.address,
          0
        )
      ).to.be.revertedWithCustomError(contract, "NonApprovableNFT");
    });
  });

});
