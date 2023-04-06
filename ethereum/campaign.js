import web3 from "./web3";
import Campaign from "./build/Campaign.json";

const getInstance = (contractAddress) => {
  if (web3 && web3.eth) {
    const parsedCInterface = JSON.parse(Campaign.interface);
    const instance = new web3.eth.Contract(parsedCInterface, contractAddress);
    return instance;
  } else {
    console.log("Web3 is :", typeof web3);
  }
};

export default getInstance;
