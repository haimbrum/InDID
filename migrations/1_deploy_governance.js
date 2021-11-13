var GovernanceToken = artifacts.require("./GovernanceToken.sol");
var VerifierGovernor = artifacts.require("./VerifierGovernor.sol");
var MyTimeLock = artifacts.require("./MyTimeLock.sol");
var VerifiedDB = artifacts.require("./VerifiedDB.sol");

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

module.exports = async function(deployer) {
  const accounts = await web3.eth.getAccounts();
  await deployer.deploy(GovernanceToken);
  const GovernanceTokenInstance = await GovernanceToken.deployed();
  
  await GovernanceTokenInstance.delegate(accounts[0]); 

  await deployer.deploy(MyTimeLock, 6575, [], []);
  await deployer.deploy(VerifierGovernor, GovernanceToken.address, MyTimeLock.address); 

  const MyTimeLockInstance = await MyTimeLock.deployed();
  const VerifierGovernorInstance = await VerifierGovernor.deployed();
  
  const proposerRole = await MyTimeLockInstance.PROPOSER_ROLE()
  const executorRole = await MyTimeLockInstance.EXECUTOR_ROLE()
  const timeLockAdminRole = await MyTimeLockInstance.TIMELOCK_ADMIN_ROLE()

  await MyTimeLockInstance.grantRole(proposerRole, VerifierGovernorInstance.address);
  await MyTimeLockInstance.grantRole(executorRole, ZERO_ADDRESS);
  await MyTimeLockInstance.revokeRole(timeLockAdminRole, accounts[0]);

  await deployer.deploy(VerifiedDB);
  const verifiedDBInstance = await VerifiedDB.deployed();
  await verifiedDBInstance.transferOwnership(MyTimeLock.address); 
};
