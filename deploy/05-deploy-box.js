const { ethers } = require("hardhat")

const deployBox = async function () {
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    await deploy("Box", {
        from: deployer,
        args: [],
        log: true,
    })
    const timeLockAddress = (await get("TimeLock")).address
    const boxAddress = (await get("Box")).address
    const box = await ethers.getContractAt("Box", boxAddress)
    await box.transferOwnership(timeLockAddress)
    log(`Deployed box to address ${boxAddress}`)
}
module.exports = deployBox
