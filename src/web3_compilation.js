const env = require("dotenv").config();
const solc = require("solc");
const fs = require("fs");
let Web3 = require("web3");
const privateKey = process.env.account_private_key;

Web3 = new Web3(new Web3.providers.HttpProvider(process.env.sepolia_rpc_url));

let ContractFile = fs.readFileSync("demo.sol").toString();
// console.log("🚀 -------------------------------🚀")
// console.log("🚀 ~ ContractFile:", ContractFile)
// console.log("🚀 -------------------------------🚀")
var input = {
  language: "Solidity",
  sources: {
    "demo.sol": {
      content: ContractFile,
    },
  },

  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log("🚀 -------------------🚀");
console.log("🚀 ~ output:", output);
console.log("🚀 -------------------🚀");

const ABI = output.contracts["demo.sol"]["Counter"].abi;
console.log("🚀 -------------🚀");
console.log("🚀 ~ ABI:", ABI);
console.log("🚀 -------------🚀");

let bytecode = output.contracts["demo.sol"]["Counter"].evm.bytecode.object;


contract=new Web3.eth.Contract(ABI);

const deploy = async () => {
  let accounts = await Web3.eth.getAccounts();
  const tx = {
    from: accounts[0],
    gas: 3000000,
    value: 0,
    data:contract.deploy({data:bytecode}).encodeABI(),

  };
  const signPromise = await Web3.eth.accounts.signTransaction(tx, privateKey);
  console.log(signPromise);


  const sentTx = Web3.eth.sendSignedTransaction(
    signPromise.raw || signPromise.rawTransaction
  ).then(function(receipt){
    console.log(receipt);
  }
  )
}
// deploy()