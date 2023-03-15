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

  describe("NFT transfer", () => {
    describe("transferFrom", () => {
      it("it should revert with a NonTransferableNFT error", async () => {
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
  
    describe("safeTransferFrom(address,address,uint256)", () => {
      it("it should revert with a NonTransferableNFT error", async () => {
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
          contract.connect(alice)["safeTransferFrom(address,address,uint256)"](
            alice.address,
            bob.address,
            0
          )
        ).to.be.revertedWithCustomError(contract, "NonTransferableNFT");
      });
    });
  
    describe("safeTransferFrom(address,address,uint256,bytes)", () => {
      it("it should revert with a NonTransferableNFT error", async () => {
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
          contract.connect(alice)["safeTransferFrom(address,address,uint256,bytes)"](
            alice.address,
            bob.address,
            0,
            []
          )
        ).to.be.revertedWithCustomError(contract, "NonTransferableNFT");
      });
    });
  });

  describe("NFT approval", () => {
    describe("approve", () => {
      it("it should revert with a NonApprovableNFT error", async () => {
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

    describe("setApprovalForAll", () => {
      it("it should revert with a NonApprovableNFT error", async () => {
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
          contract.connect(alice).setApprovalForAll(
            bob.address,
            true
          )
        ).to.be.revertedWithCustomError(contract, "NonApprovableForAllNFT");
      });
    });
  });

});
