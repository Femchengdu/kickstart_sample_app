const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
const compiledFactoryInterface = JSON.parse(compiledFactory.interface);
const factoryByteCode = compiledFactory.bytecode;
require("dotenv").config();
const mnemonic = process.env.MNEMONIC;
const infuraKey = process.env.INFURA_KEY;

const provider = new HDWalletProvider(mnemonic, infuraKey);
const web3 = new Web3(provider);

// factory = await new web3.eth.Contract(compiledFactoryInterface)
// .deploy({
//   data: factoryByteCode,
// })
// .send({ from: accounts[0], gas: "1000000" });

const deploy = async () => {
  const fetchedAccounts = await web3.eth.getAccounts();
  console.log("Attempt to deploy from  ", fetchedAccounts[0]);
  try {
    let balance = await web3.eth.getBalance(fetchedAccounts[0]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    console.log("The current balance on the account  ", balance);
    const result = await new web3.eth.Contract(compiledFactoryInterface)
      .deploy({
        data: factoryByteCode,
      })
      .send({
        from: fetchedAccounts[0],
        gas: "1000000",
      });
    console.log("The contract is deployed to.  ", result.options.address);
  } catch (error) {
    console.log("there was the following deply error:", error);
  }
  provider.engine.stop();
};
provider.engine.stop();

deploy();
