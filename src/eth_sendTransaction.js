require("dotenv").config();
const { ethers } = require("ethers");
// const abi = require("./newAbi.json");
const abi = require("../ABI/newAbi.json");

const contract_address = process.env.contract_address;
const account = process.env.account;
const account2 = process.env.account2;
const privateKey=process.env.account_private_key
const provider = new ethers.providers.JsonRpcProvider(process.env.ganache_url);

const toEth=(value)=>ethers.utils.formatEther(value);
const toWei=(value)=>ethers.utils.parseEther(value.toString());


const url = process.env.ganache_url;
const signer= provider.getSigner(account)
const contract = new ethers.Contract(contract_address, abi, signer);

const sign=async ()=>{
   let name= await contract.connect(signer).name();
   console.log("🚀 ----------------------🚀")
   console.log("🚀 ~ sign ~ name:", name)
   console.log("🚀 ----------------------🚀")

  const tx ={
    from: signer._address,
    to:process.env.contract_address,
    data: contract.interface.encodeFunctionData("transfer",[account2,toWei(0.1)])
  };
  const wallet = new ethers.Wallet(privateKey, provider);
  const trx=await wallet.sendTransaction(tx)
  
  console.log(await trx.wait());
  console.log("good to go");

}
sign()

contract.on("Transfer", (from, to, value, event) => {
  let transferEvent ={
      from: from,
      to: to,
      value: value,
      eventData: event,
  }
  console.log(event.args);
  
})
// const connect = async () => {

//     contracWithWallet = contract.connect(wallet);
//     // const tx = await contracWithWallet.mint(toWei(1));
//     // const tx = await contracWithWallet.transfer(account2, toWei(2));
  
//     // const rc = await tx.wait();
//     // const events = rc.events;
//     // console.log("🚀 -----------------------------🚀");
//     // console.log("🚀 ~ connect ~ events:", events);
//     // console.log("🚀 -----------------------------🚀");
      
//     // let events = await contract.queryFilter('Transfer', await provider.getBlockNumber())
//     // console.log("🚀 -------------------🚀")
//     // console.log("🚀 ~ events:", events)
//     // console.log("🚀 -------------------🚀")
//   };

//   connect();
  
    // contract.on("Transfer", (from, to, value, event) => {
    //     let transferEvent ={
    //         from: from,
    //         to: to,
    //         value: value,
    //         eventData: event,
    //     }
    //     console.log(event.args);
    //     // console.log(event.args.from);
    //     // console.log(JSON.stringify(transferEvent, null, 2));
    //     if(transferEvent.to==account){

    //         returnValue(transferEvent);
    //     }
    //   })

    //   function returnValue(transferEvent) {
    //         const tx = contracWithWallet.transfer(transferEvent.from, transferEvent.value); 

    //   }
      