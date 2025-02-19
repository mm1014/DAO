const MIN_DELAY = 3600
const VOTING_PERIOD = 5
const VOTING_DELAY = 2
const QUORUM_PERCENTAGE = 50
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"
const NEW_STORE_VALUE = 77
const FUNC = "store"
const PROPOSAL_DESCRIPTION = "Proposal #1 77 in the Box!"
const developmentChains = ["hardhat", "localhost"]
const proposalsFile = "proposals.json"
module.exports = {
    MIN_DELAY,
    VOTING_PERIOD,
    VOTING_DELAY,
    QUORUM_PERCENTAGE,
    ADDRESS_ZERO,
    NEW_STORE_VALUE,
    FUNC,
    PROPOSAL_DESCRIPTION,
    developmentChains,
    proposalsFile,
}
