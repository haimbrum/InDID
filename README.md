# TruBuddy
TruBuddy is a decentralized trust based network that aims is to solve the trust issue between blockchain contracts and off-chain entities and decentralize the information regarding those entities.

## Try It Out
You can try the demo app here: http://trubdy.net/verify-people.

**Please make sure that you are connected to Rinkeby test network.**

If you need a test tokens to start validating you can oppen an issue or contact me.


## Introduction
TruBuddy is a platform with the aim to bridge between blockchain contracts and off-chain entities and to decentralize the information regarding those entities.

Behind the scene, TruBuddy is implemented as a DAO app in which the validators need to stake ETH in order to validate entities.

The validators motivation is to verify entities as much as they can, in order to collect rewards. To reduce the mistakes, which can impact the trust in the blockchain, validators are penalized with loss of stake and lower rating and opportunities.

There are many use cases which smart contracts need to trust entities in order to be fulfilled. for example:

As a Business Owner, I want to prove to Regulators that I am up to date with KYC policies by referencing TruBuddy to identify other entities that I do business with.

## Overview
TruBuddy is implemented as a DAO (Decentralized Autonomous Organization) which allow to stakers (validators) to verify off-chain entities and store the entities documents over IPFS protocol.

For convenience we will use the following case:

Alice is a a customer of a DEFI smart contract that is committed to the KYC policy.

Alice wants to pay for a service and the service is also interested in that so they both can collaborate and using TruBuddy  so that they can achieve the goal.
### Verify Entity Request
Alice can submit a form by the TruBuddy's app interface. she must to fill at lease her name but she can fill unlimited number of fields.

Once the form is submitted A new DAO proposal for verifying triggered.

If over 50% of the power votes (Actually vote) were Reported as incorrect information an additional vote is being taken with more voters. 

Each of the validator who participated in the vote receives an award or pays a fine according to the correctness of his vote.

### Entity Verified
If Alice's address finally verified - the address is now referencing to the document she submitted (address -> CID).

now the insurance can easily see that the address is really belongs to Alice

The validators are arbitrarily selected based on their rating. once they choosed the have 4 choices:

1. Approve
2. Report as incorrect information
3. Delegate to someone else the trust
4. Abstain

## Technical Architecture
TruBuddy is divided into 5 contract.

- GovernanceToken - extends REC20 handle voting power and delegation.
- GovernanceController - handle the governance proposals and voting flow.
- GovernanceTimeLock - controlled by GovernanceController the executed method.
- Verified DB - storing lookup between address and IPFS document hash. can be read by everyone but can be set only by GovernanceTimeLock.
- IPFSChainlinkClient - providing an interface to interact with IPFS by calling IPFS node operator (currently is missing. will be added as soon as I find a solution to run a test node )
 
Web3 client is directly interacting with IPFSChainlinkClient  and getting the CID after successfully stores the data.

Immediately upon receipt of CID, Web3 initiate proposal to validate the the relation between the requested address and CID. 

When the vote is successful, an addingVerifiedEntity method is scheduled with the relevant address and CID.

![TruBuddy Architecture ](http://trubdy.net/architecture.png)
## Install
### Contracts
```
npm install
```

### Client
```
cd client
npm install
```

## Deploy contracts
You need truffle to be installed on your machine
```
truffle migrate
```

## IPFS Chainlink External Adapter
Since we need to store the verified entities details, we do not need to hold the actual data but only to store the hash (Address -> Hash lookup).

We using IPFS Chainlink operator node in order to store the actual data.  

If you are a node operator this may be a good opportunity for you - by helping us to decentralized you can enjoy passive income for any projects that use IPFS.

An external adapter for that can be found on Chainlink's link: https://market.link/adapters/cff4fca9-749a-4b4e-b025-6f4e90796780

Here is the source code: https://github.com/haimbrum/IPFS-Chainlnk-External-Adapter

