require("dotenv").config();
const { ethers } = require("ethers");

const abi = require("./abi.json");
const contract_address = process.env.contract_address;
const account = process.env.account;
const account2 = process.env.account2;
const privateKey = process.env.account_private_key;
const provider = new ethers.providers.JsonRpcProvider(process.env.sepolia_url);

const toEth = (value) => ethers.utils.formatEther(value);
const toWei = (value) => ethers.utils.parseEther(value.toString());
// const queryBlock=async()=>{
//     const block=await provider.getBlockNumber()
//     console.log("🚀 ------------------------------🚀")
//     console.log("🚀 ~ queryBlock ~ block:", block)
//     console.log("🚀 ------------------------------🚀")
// }
// queryBlock()
const wallet = new ethers.Wallet(privateKey, provider);
const connect = async () => {
  const contract = new ethers.Contract(contract_address, abi, provider);

  const name = await contract.name();
  console.log(
    "🚀 -------------------------------------------------------------🚀"
  );
  console.log("🚀 ~ connect ~  contract name:", name);
  console.log(
    "🚀 -------------------------------------------------------------🚀"
  );

  // const tx=await wallet.sendTransaction({
  //     to:account2,
  //     value:ethers.utils.parseEther("0.001")
  // })
  // await tx.wait()
  // console.log(tx);

  contracWithWallet = contract.connect(wallet);
  const tx = await contracWithWallet.transfer(account2, toWei(1));

  const rc = await tx.wait();
  const events = rc.events;
  console.log("🚀 -----------------------------🚀");
  console.log("🚀 ~ connect ~ events:", events);
  console.log("🚀 -----------------------------🚀");
};
connect();
