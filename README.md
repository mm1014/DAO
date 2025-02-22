# Create a DAO, initiate proposals, vote, and execute the proposal.


## Getting Started
### Requirements
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Nodejs](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
### Quickstart
```bash
git clone https://github.com/mm1014/DAO
cd DAO
npm install
```

## Usage
1. Run a local blockchain:
```bash
npx hardhat node
```
2. Run scripts
   
- Propose a new value to be added to our Box contract
```bash
npx hardhat run scripts/propose.js --network localhost
```  

- Vote on that proposal
```bash
npx hardhat run scripts/vote.js --network localhost
```  

- Queue&Execute proposal
```bash
npx hardhat run scripts/queue-and-execute.js --network localhost
```  


 