const User = require("../model/User");

exports.loginUser = async (req, res) => {
  try {
    const uname = req.body.uname;
    const password = req.body.password;
    const userInfo = await User.findByCredentials(uname, password);
    if (!userInfo) {
      return res.status(401).json({error: "Authentication failed"});
    } 
    res.status(201).json({userInfo});
  } catch (err) {
    res.status(400).json({err: err});
  }
};

exports.registerUser = async (req, res) => {
  let isUserExist = await User.find({uname: req.body.uname});
  if (isUserExist.length >= 1) {
    return res.status(409).json({message: "Username exists"});
  }   
  const user = new User({
    uname: req.body.uname,
    role: req.body.role,
    password: req.body.password
  });
  await user.save();
  await user.generateAuthToken();
  res.status(201).json({message: "Successfully register the user"});
};  
