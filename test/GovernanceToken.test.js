const GovernanceToken = artifacts.require("./GovernanceToken.sol");

var BN = web3.utils.BN;

var chai = require("./chaiSetup");

const expect = chai.expect;

const TOTAL_SUPPLY = 1000000000000000;

contract("GovernanceToken", accounts => {
  it("it should have the defined total supply.", async () => {
    const governanceTokenInstance = await GovernanceToken.deployed();
    const totalSupply = await governanceTokenInstance.totalSupply()
    expect(totalSupply).to.be.a.bignumber.equal(new BN(TOTAL_SUPPLY))
  });

  it("deployer should hold the total supply.", async () => {
    const governanceTokenInstance = await GovernanceToken.deployed();
    const balanceOfDeployer = await governanceTokenInstance.balanceOf(accounts[0])
    expect(balanceOfDeployer).to.be.a.bignumber.equal(new BN(TOTAL_SUPPLY))
  });
});
