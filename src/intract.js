require("dotenv").config();
const Provider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const abi = require("../ABI/Tokens.json");

const toWei = (num) => Web3.utils.toWei(num.toString(), "ether");
const toEth = (num) => Web3.utils.fromWei(num.toString(), "ether");
const url = process.env.sepolia_rpc_url;

// Normal provider
const web3 = new Web3(url);

// HdWalletProvider connection
const provider = new Provider(process.env.account_private_key, url);
const newWeb3 = new Web3(provider);

const contract = new web3.eth.Contract(abi.abi, process.env.token_contract);
const myContract = new newWeb3.eth.Contract(abi.abi, process.env.token_contract);


const mint = async () => {
    const trx = await myContract.methods
      .simpleMint(toWei(100))
      .send({ from: process.env.account, gasLimit: 6721975 });
    console.log(`Minted token to: ${process.env.account}`);
    console.log(`Transaction receipt: ${trx}`);
  };

// mint()
const transfer = async () => {
    const trx = await myContract.methods
      .transfer("0x80A344d8095d099bb72e6298aA8bA2C9E82A4Cbe", toWei(1))
      .send({ from: process.env.account });
    console.log("Transaction hash: ", trx.transactionHash);
  };
  
  transfer()

  contract.methods
  .balanceOf(process.env.account)
  .call()
  .then((balances) => console.log(`Account1 balances : ${toEth(balances) }`));