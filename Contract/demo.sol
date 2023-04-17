// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;


contract Counter{
   uint public count; //if variable is public than remix gives getter function automatic
    int public negative=-99;
    constructor () {
        count=0;
    }

    string public Name="dhaval";
    address public myAddress=0xE75DF387a3F47f1760d0Dd423b27d2eEFD59c6b9;
    
    function setCount(uint num) public{
        count=num;
    }

//    function getCount() public view returns(uint) {  
//        return count;
//    }

   function IncrementCount() public{
       count= count + 1;
   }
}