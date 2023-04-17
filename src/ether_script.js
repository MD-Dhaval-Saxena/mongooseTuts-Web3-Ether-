require("dotenv").config();
const Tx = require("ethereumjs-tx");
const { ethers } = require("ethers");


const abi = require("../ABI/abi.json");
const contract_address = process.env.contract_address;
const account = process.env.account;
const account2 = process.env.account2;
const privateKey=process.env.account_private_key
const provider = new ethers.providers.JsonRpcProvider(process.env.sepolia_url);

const toEth=(value)=>ethers.utils.formatEther(value);
const toWei=(value)=>ethers.utils.parseEther(value.toString());
const url = process.env.sepolia_rpc_url;
const wallet = new ethers.Wallet(privateKey, provider);


  const signer= provider.getSigner(account)

const contract = new ethers.Contract(contract_address, abi, signer);

// const sign=async ()=>{
  // const _tx = await contract.transfer(account2, toWei(0.1))
  // const txCount=await provider.getTransactionCount(account)
  // console.log(signer);
//   const acc=signer._address


//   const tx = new Tx({
//     from: signer._address,
//     to:process.env.contract_address,
//     value: toEth(100000),
//     gas: 3000000,
//     // data:contract.methods.mint(100).encodeABI(),

//   });
//   const signPromise= await signer.signTransaction(tx);
//   console.log("🚀 ------------------------------------🚀")
//   console.log("🚀 ~ sign ~ signPromise:", signPromise)
//   console.log("🚀 ------------------------------------🚀")

//     // const signature=await provider.sendTransaction({
//     //   value: tx.value,
//     //   data: tx.data,
//     //   from: tx.from,
//     //   to: tx.to,
//     //   gasLimit: tx.gas,
//     // })

  
//   console.log("good to go");

// }
// sign()
const connect = async () => {

    contracWithWallet = contract.connect(wallet);
    // const tx = await contracWithWallet.mint(toWei(1));
    const tx = await contracWithWallet.transfer(account2, toWei(2));
  
    // const rc = await tx.wait();
    // const events = rc.events;
    // console.log("🚀 -----------------------------🚀");
    // console.log("🚀 ~ connect ~ events:", events);
    // console.log("🚀 -----------------------------🚀");
      
    // let events = await contract.queryFilter('Transfer', await provider.getBlockNumber())
    // let events= await contract.listenerCount('Transfer');
    // let events= await contract.listeners('Transfer');
    // let events=  contract.off('Transfer');

    
    console.log("🚀 -----------------------------🚀")
    console.log("🚀 ~ connect ~ events:", events)
    console.log("🚀 -----------------------------🚀")
    // console.log("🚀 -------------------🚀")  
    // console.log("🚀 ~ events:", events)
    // console.log("🚀 -------------------🚀")
  };

  connect();
  
    contract.on("Transfer", (from, to, value, event) => {
        let transferEvent ={
            from: from,
            to: to,
            value: value,
            eventData: event,
        }
        console.log(event);
        // console.log(event.args);
        // console.log(event.args.from);
        // console.log(JSON.stringify(transferEvent, null, 2));
        if(transferEvent.to==account){

            returnValue(transferEvent);
        }
      })

      function returnValue(transferEvent) {
            const tx = contracWithWallet.transfer(transferEvent.from, transferEvent.value); 

      }
      