const { ethers, network } = require("hardhat")
const {
    NEW_STORE_VALUE,
    FUNC,
    PROPOSAL_DESCRIPTION,
    proposalsFile,
    developmentChains,
    VOTING_DELAY,
} = require("../helper-hardhat-config")
const fs = require("fs")
const { moveBlocks } = require("../utils/move-blocks")

const propose = async (args, functionToCall, proposalDescription) => {
    const { get } = deployments
    const boxAddress = (await get("Box")).address
    const box = await ethers.getContractAt("Box", boxAddress)
    const governorAddress = (await get("GovernorContract")).address
    const governor = await ethers.getContractAt("GovernorContract", governorAddress)
    const encodedFunctionCall = box.interface.encodeFunctionData(functionToCall, args) //提议的目标函数及其参数的编码
    console.log(`Proposing ${functionToCall} on ${boxAddress} with ${args}`)
    console.log(`Proposal Description: ${proposalDescription}`)
    const proposeTx = await governor.propose(
        [boxAddress],
        [0],
        [encodedFunctionCall],
        proposalDescription,
    )
    const proposeReceipt = await proposeTx.wait(1)
    const proposalId = proposeReceipt.logs[0].args[0]
    const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
    proposals[network.config.chainId].push(proposalId.toString())
    fs.writeFileSync(proposalsFile, JSON.stringify(proposals))
    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_DELAY)
    }
    console.log("Proposed!!")
}

propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
