const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect("mongodb://127.0.0.1:27017/MyUsers");

async function run() {
  // const user=await User.create({name:"Dhaval",age:22})
  try {
    const user = await User.create({
      name: "jash",
      age: 22,
      hobbies: ["bike Riding", "Music"],
      address: {
        street: "Main road",
        city: "ahemdabad",
      },
    });
    user.save();
    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
}
// run();


async function getById(){
    try {
    const user= await User.findById("641c3c833592d1c16b00c4ee")
    console.log(user);        
    } catch (error) {
        // console.log(error.message);
    }
}
getById()

async function getAll(){
    try {
    const user= await User.find()
    console.log(user);        
    } catch (error) {
        // console.log(error.message);
    }
}
getAll()


async function deleteByName(){
    try {
        const user=await User.deleteOne({name:"ja"})
        user.save()
        console.log(user)
    } catch (error) {
        
    }
}
deleteByName()


