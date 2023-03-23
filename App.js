const express=require('express');
const mongoose = require("mongoose");

const Router = require("./routes")

const app = express();

app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/MyUsers");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(Router);
app.listen(3000,()=>{
    console.log(`Server listening at: http://127.0.0.1:3000`)

});