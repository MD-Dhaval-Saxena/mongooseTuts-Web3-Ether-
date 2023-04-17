const { ethers } = require("ethers");
const { Interface, FormatTypes } = require("ethers/lib/utils");
const abi=require('../ABI/abi.json');

const  ethstrings = require("@ethersproject/strings");
const iFace=new ethers.utils.Interface(abi);

const data = "0x0000000000000000000000000000000000000000000000000de0b6b3a7640000";
const topics =[
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    '0x000000000000000000000000e75df387a3f47f1760d0dd423b27d2eefd59c6b9',
    '0x00000000000000000000000093c606c3e3cd8dce28f0a9a426149115087ea9fe'
  ];

let event=iFace.decodeEventLog("Transfer", data, topics);
console.log("🚀 -----------------🚀")
console.log("🚀 ~ event:", event)
console.log("🚀 -----------------🚀")

// let account="0xE75DF387a3F47f1760d0Dd423b27d2eEFD59c6b9";
// let call = iFace.functions.balanceOf.encode("0xE75DF387a3F47f1760d0Dd423b27d2eEFD59c6b9");
// console.log("🚀 ---------------🚀")
// console.log("🚀 ~ call:", call)
// console.log("🚀 ---------------🚀")
// let nceHash=iFace.getSighash("nceOf");
// let eventTopic=iFace.getEventTopic("Transfer")
// console.log("🚀 ---------------------------🚀")
// console.log("🚀 ~ eventTopic:", eventTopic)
// console.log("🚀 ---------------------------🚀")
// console.log("🚀 ---------------------🚀")
// console.log("🚀 ~ nceHash:", nceHash)
// console.log("🚀 ---------------------🚀")
// const format= iFace.format(FormatTypes.full)
// console.log("🚀 -------------------🚀")
// console.log("🚀 ~ format:", format)
// console.log("🚀 -------------------🚀")

// const abiCoder=new ethers.utils.AbiCoder([iFace])
// let encode=abiCoder.encode([ "uint", "string" ], [ 1234, "Hello World" ]);
// console.log("🚀 -------------------🚀")
// console.log("🚀 ~ encode:", encode)
// console.log("🚀 -------------------🚀")
// let a=ethers.utils.keccak256( ethstrings.toUtf8Bytes("aBytesLike")) 
// let a=ethers.utils.ripemd160( ethstrings.toUtf8Bytes("aBytesLike")) 
// let a=ethers.utils.sha256( ethstrings.toUtf8Bytes("aBytesLike")) 
// let a=ethers.utils.sha512( ethstrings.toUtf8Bytes("aBytesLike")) 
// let a=ethers.utils.hashMessage("hello programmer") 
// console.log(a);
// const data="0x00000000000000000000000000000000000000000000000000000000000004d20000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000b48656c6c6f20576f726c64000000000000000000000000000000000000000000"

// const decode=abiCoder.decode([ "uint", "string" ], data);   
// console.log("🚀 -------------------🚀")
// console.log("🚀 ~ decode:", decode)
// console.log("🚀 -------------------🚀")


// const iface = new Interface([
//     // Constructor
//     "constructor(string symbol, string name)",
  
//     // State mutating method
//     "function transferFrom(address from, address to, uint amount)",
  
//     // State mutating method, which is payable
//     "function mint(uint amount) payable",
  
//     // Constant method (i.e. "view" or "pure")
//     "function nceOf(address owner) view returns (uint)",
  
//     // An Event
//     "event Transfer(address indexed from, address indexed to, uint256 amount)",
  
//     // A Custom Solidity Error
//     "error AccountLocked(address owner, uint256 nce)",
  
//     // Examples with structured types
//     "function addUser(tuple(string name, address addr) user) returns (uint id)",
//     "function addUsers(tuple(string name, address addr)[] user) returns (uint[] id)",
//     "function getUser(uint id) view returns (tuple(string name, address addr) user)"
//   ]);
//   console.log(iface);