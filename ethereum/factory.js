import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const parsedCFInterface = JSON.parse(CampaignFactory.interface);
const contractAddress =
  process.env.CONTRACT_ADDRESS || process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

let instance;
if (web3 && web3.eth) {
  instance = new web3.eth.Contract(parsedCFInterface, contractAddress);
} else {
  console.log("Web3 is :", typeof web3);
}

export default instance;
