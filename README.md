# Kickstarter demo app

A simple app that utilizes a smart contract to interact with a kickstarter-like web app

### Note this project needs certain environment variables to be configured

The following environment variables above should be set in the project's root `./`.

- `CONTRACT_ADDRESS`
- `NEXT_PUBLIC_CONTRACT_ADDRESS`
- `INFURA_KEY`

Another set of environment variables are used in the `/ethereum` folder
and consist of

- `MNEMONIC`
- `INFURA_KEY`

### The major highlights of this project consist of

- The use of the web3js library to interact with the smart contract
- The testing of the smart contract using the Gnache CLI and the mocha test library

### TODO

- Upgrade the smart contract from the current version of solidity
- A deeper dive into smart contract testing
- Turning the compile and deploy scripts into reuseable libraries.
