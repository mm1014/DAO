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
1. run a local node:
```bash
npx hardhat node
```
2. run propose、vote and execute scripts in sequence
```bash
npx hardhat run scripts/propose.js scripts/vote.js scripts/queue-and-execute.js --network localhost
```  


 