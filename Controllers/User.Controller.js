const userModel = require("../Models/User");


module.exports={
    getAllUsers:async (request, response,next) => { 
        const users = await userModel.find({});
      
        try {
          response.send(users);
        } catch (error) {
          next(error)
        }
      },
    AddUser:async (request, response,next) => {
        const user = new userModel(request.body);
        try {
          await user.save();
          // response.send(user);
          response.send({ Status: "User Added Succefully" });
        } catch (error) {
          next(error)
        }
      },
    DeleteUser:async (request, response,next) => {
        
        //   const user = await userModel.find(request.body).deleteOne();
        try {
        const user = await userModel.findOneAndRemove(request.body);
          response.send({ Status: "User Deleted Succefully" });
        //   response.send(user);
        } catch (error) {
          next(error)
        }
      },
    DeleteMultiUser:async (req, res) => {
        const filter = req.body;
        const user = await userModel.deleteMany(filter);
        try {
          res.send(user);
        } catch (error) {
          response.status(500).send(error);
        }
      },
    UpdateUserData:async (request, response) => {
        const filter = request.body[0];
        const update = request.body[1];
        const user = await userModel.findOneAndUpdate(filter, update, {
          new: true,
          upsert: true,
          rawResult: true,
        });
      
        try {
          // await user.save();
          response.send(user);
        } catch (error) {
          console.log(error);
          response.status(500).send(error);
        }
      },
    FindUserByQuery:async (request, response) => {
        const users = await userModel.find(request.body);
      
        try {
          response.send(users);
        } catch (error) {
          response.status(500).send(error);
        }
      },
    
      
}