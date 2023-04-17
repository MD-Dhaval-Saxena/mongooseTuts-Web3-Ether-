const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const addressSchema = new Schema({
  street: String,
  city: String,
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  age: Number,
  email: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  bestfriend: mongoose.SchemaTypes.ObjectId,
  hobbies: [String],
  address: addressSchema,
});

module.exports = mongoose.model("User", userSchema);
