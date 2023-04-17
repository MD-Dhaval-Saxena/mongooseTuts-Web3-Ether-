require("dotenv").config();
const express=require('express');
const mongoose = require("mongoose");
const port=process.env.port || 3000;
const Router = require("../Routes/routes")

const app = express();

app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/MyUsers");
// mongoose.connect("mongodb+srv://dhaval:r1EhPNtvJIswPDpi@cluster0.km7zy0i.mongodb.net?retryWrites=true&w=majority/MyUsers")

// r1EhPNtvJIswPDpi
// mongodb+srv://dhaval:<password>@cluster0.km7zy0i.mongodb.net/?retryWrites=true&w=majority

// const db = mongoose.connection;
app.use(Router);

app.listen(port ,()=>{
    console.log(`Server listening at: http://127.0.0.1:${port}`)


});