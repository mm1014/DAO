require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const MNEMONIC = process.env.MNEMONIC || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const REPORT_GAS = process.env.REPORT_GAS || false
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            allowUnlimitedContractSize: true,
        },
        localhost: {
            chainId: 31337,
            allowUnlimitedContractSize: true,
        },
        sepolia: {
            url: "https://sepolia.infura.io/v3/3760917edb5f479388e2d76eff84859f",
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            chainId: 11155111,
            allowUnlimitedContractSize: true, //最好加上，不然会报错
        },
    },
    etherscan: {
        apiKey: {
            sepolia: ETHERSCAN_API_KEY,
        },
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
    },
    solidity: {
        compilers: [
            {
                version: "0.8.18",
            },
        ],
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    mocha: {
        timeout: 300000,
    },
}
