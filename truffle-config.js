const path = require("path");
require("dotenv").config({path:"./.env"})
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(process.env.MEMONIC, "https://kovan.infura.io/v3/e7486e48766843f9a31e0fac5776549c", 0)
      },
      network_id: 42
    }
  },
  compilers: {
    solc: {
      version: "0.8.7",
      settings: {
        optimizer: {
          enabled: true,
          runs: 20  
        },
      }
    }
 }
};
