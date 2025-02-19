const { proposalsFile, developmentChains, VOTING_PERIOD } = require("../helper-hardhat-config")
const { network, ethers } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")
const fs = require("fs")

const main = async (proposalIndex) => {
    const { get } = deployments
    const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
    // Get the last proposal for the network. You could also change it for your index
    const proposalId = proposals[network.config.chainId][proposalIndex]
    // 0 = Against, 1 = For, 2 = Abstain for this example
    const voteWay = 1
    const governorAddress = (await get("GovernorContract")).address
    const governor = await ethers.getContractAt("GovernorContract", governorAddress)
    console.log("Voting...")
    await governor.castVote(proposalId, voteWay)
    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_PERIOD)
    }
    console.log("Voted!")
}

main(0)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
