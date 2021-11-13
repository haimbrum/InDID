const VerifierGovernor = artifacts.require("./VerifierGovernor.sol");
const VerifiedDB = artifacts.require("./VerifiedDB.sol");
const MyTimeLock = artifacts.require("./MyTimeLock.sol");

var BN = web3.utils.BN;

const { assert } = require("console");
var chai = require("./chaiSetup");

const expect = chai.expect;

const VERIFIED_ENITY = {
    data: "Pickles",
    confidence: 100
};

const ENTITY_HASH = 123;

contract("VerifierGovernor", accounts => {
    it("only TimeLock is able to add a new verified entity", () => new Promise((res, rej) => { // Todo: simplify it (may use chai-as-promised here)
        VerifiedDB.deployed().then(verifiedDBInstance => {
            verifiedDBInstance.addVerifiedEntity(ENTITY_HASH, VERIFIED_ENITY).then(res => {
                rej("addVerifiedEntity should revert any transactions comes from a different address from the TimeLockContract");
            }).catch(err => {
                expect(err.message).to.contain("caller is not the owner.")
                res();
            });
        });
    }));
});
