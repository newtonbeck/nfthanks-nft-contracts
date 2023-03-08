import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFThanks", function () {
  it("Test contract", async function () {
    const ContractFactory = await ethers.getContractFactory("NFThanks");

    const instance = await ContractFactory.deploy();
    await instance.deployed();

    expect(await instance.name()).to.equal("NFThanks");
  });
});
