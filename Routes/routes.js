const express = require("express");
const app = express();
const router = express.Router();
const UserController = require("../Controllers/User.Controller");

router.get("/", async (req, res) => {
  res.send("<h1>Welcome Home</h1>");
});
router.post("/add_user", UserController.AddUser);
router.get("/users", UserController.getAllUsers);
router.delete("/delete", UserController.DeleteUser);
router.delete("/deleteMany", UserController.DeleteMultiUser);
router.patch("/update", UserController.UpdateUserData);

router.get("/query", UserController.FindUserByQuery);
router.get("/dowload", async (req, res) => {
  res.download("mongo.png");
});
router.get("/demo", async (req, res) => {
  res.redirect({});
});
router.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
router.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ error: { status: err.status || 500, message: err.message } });
});

module.exports = router;
