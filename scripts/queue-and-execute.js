const { ethers, network } = require("hardhat")
const {
    FUNC,
    NEW_STORE_VALUE,
    PROPOSAL_DESCRIPTION,
    MIN_DELAY,
    developmentChains,
} = require("../helper-hardhat-config")
const { moveTime } = require("../utils/move-time")
const queueAndExecute = async (args, functionToCall) => {
    const { get } = deployments
    const boxAddress = (await get("Box")).address
    const box = await ethers.getContractAt("Box", boxAddress)
    const governorAddress = (await get("GovernorContract")).address
    const governor = await ethers.getContractAt("GovernorContract", governorAddress)
    const encodedFunctionCall = box.interface.encodeFunctionData(functionToCall, args)
    const descriptionHash = ethers.id(PROPOSAL_DESCRIPTION)
    console.log("Queueing...")
    await governor.queue([boxAddress], [0], [encodedFunctionCall], descriptionHash)
    console.log("Queued!")
    if (developmentChains.includes(network.name)) {
        await moveTime(MIN_DELAY)
    }
    console.log("Executing...")
    await governor.execute([boxAddress], [0], [encodedFunctionCall], descriptionHash)
    console.log("Executed!")
    console.log(`Box value: ${await box.retrieve()}`)
}

queueAndExecute([NEW_STORE_VALUE], FUNC)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
