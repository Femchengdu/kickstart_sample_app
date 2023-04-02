import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const parsedCFInterface = JSON.parse(CampaignFactory.interface);
const contractAddress = "0xf9612926c3a8e2274bE4D96A95D51ED8dC5e5427";
let instance;
if (web3 && web3.eth) {
  instance = new web3.eth.Contract(parsedCFInterface, contractAddress);
} else {
  console.log("Web3 is :", typeof web3);
}

export default instance;
