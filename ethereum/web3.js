import Web3 from "web3";

let web3;
try {
  if (window) {
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
  } else {
    web3 = {};
  }
} catch (error) {
  console.log("There is a problem with the window object", error.message);
}

export default web3;
