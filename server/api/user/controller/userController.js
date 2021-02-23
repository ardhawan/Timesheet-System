const User = require("../model/User");

exports.loginUser = async (req, res) => {
  try {
    const uname = req.body.uname;
    const password = req.body.password;
    const user = await User.findByCredentials(uname, password);
    console.log(user);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    }
    // const token = await user.generateAuthToken();
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.registerNewUser = async (req, res) => {
  try {
    let isUser = await User.find({ uname: req.body.uname });
    console.log(isUser);
    if (isUser.length >= 1) {
      return res.status(409).json({
        message: "username already in use"
      });
    }
    const user = new User({
      uname: req.body.uname,
      role: req.body.role,
      password: req.body.password
    });
    let data = await user.save();
    const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
    res.status(201).json({ data, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.getModuleJobRole = async (req, res) => {
  try {
    let mjInfo = await User.find({ }, {jobrole:1, module:1, _id:0});
    console.log(mjInfo);
    console.log("Success we found the information");
    res.status(201).json({ mjInfo });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};   
