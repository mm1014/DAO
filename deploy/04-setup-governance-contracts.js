const { ethers } = require("hardhat")
const { ADDRESS_ZERO } = require("../helper-hardhat-config")

const setupContracts = async function () {
    const { log, get } = deployments
    const { deployer } = await getNamedAccounts()
    const timeLockAddress = (await get("TimeLock")).address
    const timeLock = await ethers.getContractAt("TimeLock", timeLockAddress)
    const governorContractAddress = (await get("GovernorContract")).address
    log("Setting up roles...")
    const proposerRole = await timeLock.PROPOSER_ROLE()
    const executorRole = await timeLock.EXECUTOR_ROLE()
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()
    const proposerTx = await timeLock.grantRole(proposerRole, governorContractAddress)
    await proposerTx.wait(1)
    const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO)
    await executorTx.wait(1)
    const revokeTx = await timeLock.revokeRole(adminRole, deployer)
    await revokeTx.wait(1)
    log("Set up roles successful")
}

module.exports = setupContracts
