const env=require("dotenv").config();

let Web3 = require("web3");
const abi = require("../ABI/abi.json");
const  DataEvents={}

Web3 = new Web3(new Web3.providers.HttpProvider(process.env.sepolia_rpc_url));
// Web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.sepolia_rpc_url));
let account = process.env.account;
let account2 = process.env.account2;
const privateKey = process.env.account_private_key;
const privateKey2 = process.env.account2_private_key;

// const checkEvent=async()=>{
//   let testContract= new Web3.eth.Contract(abi,process.env.contract_address);
//   testContract.on("transfer",(from,to,amount)=>{
//     console.log("transfer event emitted");
//     console.log(from,to,amount.toString());
//   })
// }
const contract = new Web3.eth.Contract(abi, process.env.contract_address);


const send = async () => {
  let accounts = await Web3.eth.getAccounts();
  const tx = {
    from: accounts[0],
    to: process.env.contract_address,
    gas: 3000000,
    value: 0,
    // Mint approve transferFrom
    // data:contract.methods.mint(100).encodeABI(),
    // data:contract.methods.approve(account,10).encodeABI(),
    // data: contract.methods.transferFrom(account,account2,10).encodeABI(),
    data: contract.methods.transfer(account2,10).encodeABI(),
    
    // data: contract.methods.burn(10).encodeABI(),

  };
  // checkEvent()
  const signPromise = await Web3.eth.accounts.signTransaction(tx, privateKey);
  console.log(signPromise);


  const sentTx = Web3.eth.sendSignedTransaction(
    signPromise.raw || signPromise.rawTransaction
  )
  .then(function(receipt){
    console.log(receipt);
  })

  // sentTx.on("transfer", (transfer) => {
  //   // do something when receipt comes back
  //   console.log(transfer);
  // });
//   sentTx.on("error", (err) => {
//     //   do something on transaction error
//     }).catch((err) => {
//         console.log(err);
//     });
};  
send();

// let options = {
//   fromBlock: 0,
//   address: [account, account2],    //Only get events from specific addresses
//   topics: []                              //What topics to subscribe to
// };

// let subscription = Web3.eth.subscribe('logs', options,(err,event) => {
//   if (!err)
//   console.log(event)
// });

// subscription.on('data', event => console.log(event))
// subscription.on('changed', changed => console.log(changed))
// subscription.on('error', err => { throw err })
// subscription.on('connected', nr => console.log(nr))




contract.methods.name().call().then((name)=>console.log(`Token Name: ${name}`));
contract.methods.totalSupply().call().then((totalSupply)=>console.log(`totalSupply : ${totalSupply}`));
contract.methods.balanceOf(account).call().then((balances)=>console.log(`Account1 balances : ${balances}`));
contract.methods.balanceOf(account2).call().then((balances)=>console.log(`Account2 balances : ${balances}`));
contract.methods.allowance(account,account).call().then((allowance)=>console.log(`Account1 allowance : ${allowance}`));
contract.methods.allowance(account,account2).call().then((allowance)=>console.log(`Account2 allowance : ${allowance}`));

