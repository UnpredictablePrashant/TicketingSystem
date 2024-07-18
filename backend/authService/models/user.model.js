const db = require("../utils/conn");
const mongoose = require("../utils/conn").mongoose;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    unique: true,
    index: true,
  },
  phoneNo: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 18,
  },
  userType: {
    type: String,
    required: true,
    default: "subscriber",
    enum: ["subscriber", "admin", "support"],
  },
  userLevel:{
    type: String,
    required: true,
    default: "user",
    enum: ['user','l1', 'l2', 'l3', 'admin', 'cxo']
  },
  accountStatus: {
    type: String,
    default: "onhold",
    enum: ["active", "onhold"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("user", userSchema);
module.exports = { User };
