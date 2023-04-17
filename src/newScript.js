require("dotenv").config();
const Provider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const abi = require("../ABI/abi.json");

const toWei = (num) => Web3.utils.toWei(num.toString(), "ether");
const toEth = (num) => Web3.utils.fromWei(num.toString(), "ether");
const url = process.env.sepolia_rpc_url;

// // accounts
let account = process.env.account;
let account2 = process.env.account2;

// Normal provider
const web3 = new Web3(url);

// HdWalletProvider connection
const provider = new Provider(process.env.account_private_key, url);
const newWeb3 = new Web3(provider);

const contract = new web3.eth.Contract(abi, process.env.contract_address);
const myContract = new newWeb3.eth.Contract(abi, process.env.contract_address);

const mint = async () => {
  const trx = await myContract.methods
    .mint(toWei(100))
    .send({ from: process.env.account, gasLimit: 6721975 });
  console.log(`Minted token to: ${process.env.account}`);
  console.log(`Transaction receipt: ${trx}`);
};

const transfer = async () => {
  const trx = await myContract.methods
    .transfer(account2, toWei(1))
    .send({ from: process.env.account });
  console.log("Transaction hash: ", trx.transactionHash);
};


contract.methods
  .balanceOf(process.env.account)
  .call()
  .then((balances) => console.log(`Account1 balances : ${toEth(balances)}`));

let options = {
  filter: {
    value: [],
  },
  fromBlock: "latest",
  topics: [], //What topics to subscribe to
};


  contract.events
    .Transfer(options)
    .on("data", (event) => {
      console.log(event);

      if (event.returnValues.to==process.env.account) {
        returnValue(event);
      }
    })
    .on("changed", (changed) => console.log(changed))
    .on("error", (err) => console.log(err.message))
    .on("connected", (str) => console.log(str));



function returnValue(event) {
  myContract.methods
    .transfer(event.returnValues.from, event.returnValues.value)
    .send({ from: process.env.account });
}

const main = () => {
  // mint()
  transfer();
};
main();
