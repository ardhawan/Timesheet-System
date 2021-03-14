const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  uname: {
    type: String,
    required: [true, "Please Include The Username"]
  },
  role: {
    type: String,
    required: [true, "Please Include The Role"]
  },
  password: {
    type: String,
    required: [true, "Please Include The Password"]
  },
  token: {
    type: String
  }
});

userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  user.token = jwt.sign({ _id: user._id, uname: user.uname, role: user.role },"project")
  await user.save();
};

userSchema.statics.findByCredentials = async (uname, password) => {
  const userInfo = await User.findOne({uname});
  if (!userInfo) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, userInfo.password);
  if (!isMatch) {
    return null;
  }
  return userInfo;
};

const User = mongoose.model("User", userSchema);
module.exports = User;