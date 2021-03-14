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

exports.registerNewUser = async (req, res) => {
  try {
    let isUser = await User.find({uname: req.body.uname});
    console.log(isUser);
    if (isUser.length >= 1) {
      return res.status(409).json({message: "Username exists"});
    }
    const user = new User({
      uname: req.body.uname,
      role: req.body.role,
      password: req.body.password
    });
    let data = await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ data, token });
  } catch (err) {
    res.status(400).json({err: err});
  }
};  
