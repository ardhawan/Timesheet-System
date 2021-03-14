const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  uname: {
    type: String,
    required: [true, "Please Include your username"]
  },
  role: {
    type: String,
    required: [true, "Please Include your role"]
  },
  password: {
    type: String,
    required: [true, "Please Include your password"]
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

//this function generates an auth token for the user
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, uname: user.uname, role: user.role },
    "secret"
  );
  // user.tokens = user.tokens.concat({ token });
  user.token = token;
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (uname, password) => {
  const userDetails = await User.findOne({uname});
  if (!userDetails) {
    return userDetails;
  }
  const isMatch = await bcrypt.compare(password, userDetails.password);
  if (!isMatch) {
    return null;
  }
  return userDetails;
};

const User = mongoose.model("User", userSchema);
module.exports = User;