const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

require("dotenv").config();
const mnemonic = process.env.MNEMONIC;
const infuraKey = process.env.INFURA_KEY;
const provider = new HDWalletProvider(mnemonic, infuraKey);
const web3 = new Web3(provider);

const deploy = async () => {
  const fetchedAccounts = await web3.eth.getAccounts();
  console.log("Attempt to deploy from  ", fetchedAccounts[0]);
  try {
    let balance = await web3.eth.getBalance(fetchedAccounts[0]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    console.log("The current balance on the account  ", balance);
    const result = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({ data: compiledFactory.evm.bytecode.object })
      .send({ gas: "1400000", from: accounts[0] });

    console.log("The contract is deployed to.  ", result.options.address);
  } catch (error) {
    console.log("there was the following deply error:", error);
  }
  provider.engine.stop();
};
deploy();
