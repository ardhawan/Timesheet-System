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
  // tokens: [
  //   {
  //     token: {
  //       type: String,
  //       required: true
  //     }
  //   }
  // ]
  token: {
    type: String
    // required: true
  }
});

userSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
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

//this method search for a user by email and password.
userSchema.statics.findByCredentials = async (uname, password) => {
  const user = await User.findOne({ uname });
  console.log(user);
  if (!user) {
    console.log("Please produce an error");
    // throw new Error({ error: "Invalid login details" });
    return user;
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    console.log("We have hit here");
    // throw new Error({ error: "Invalid login details" });
    return null;
  }
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;