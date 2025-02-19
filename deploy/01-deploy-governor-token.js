const { ethers } = require("hardhat")

const deployGovernanceToken = async () => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const governanceToken = await deploy("GovernanceToken", {
        from: deployer,
        args: [],
        log: true,
    })
    log(`Deployed governance token to address ${governanceToken.address}`)
    await delegate(governanceToken.address, deployer)
    log("Delegated!")
}

const delegate = async (governanceTokenAddress, delegatedAccount) => {
    const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress)
    await governanceToken.delegate(delegatedAccount)
    console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`)
}

module.exports = deployGovernanceToken
