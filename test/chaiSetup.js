"use strict"

var chai = require("chai");
var BN = web3.utils.BN;
var chainBn = require("chai-bn")(BN);

chai.use(chainBn);
module.exports = chai