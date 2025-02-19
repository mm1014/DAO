const { MIN_DELAY } = require("../helper-hardhat-config")

const deployTimeLock = async function (hre) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const timelock = await deploy("TimeLock", {
        from: deployer,
        args: [MIN_DELAY, [], [], deployer],
        log: true,
    })
    log(`Deployed timelock to address ${timelock.address}`)
}

module.exports = deployTimeLock
