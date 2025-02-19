const { VOTING_PERIOD, VOTING_DELAY, QUORUM_PERCENTAGE } = require("../helper-hardhat-config")

const deployTimeLock = async function () {
    const { deploy, get, log } = deployments
    const { deployer } = await getNamedAccounts()
    const governanceTokenAddress = (await get("GovernanceToken")).address
    const timeLockAddress = (await get("TimeLock")).address
    const args = [
        governanceTokenAddress,
        timeLockAddress,
        QUORUM_PERCENTAGE,
        VOTING_PERIOD,
        VOTING_DELAY,
    ]
    const governor = await deploy("GovernorContract", {
        from: deployer,
        args: args,
        log: true,
    })
    log(`Deployed governorContract successfully to address ${governor.address}`)
}

module.exports = deployTimeLock
