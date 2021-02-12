const Deadline = require("../model/Deadline");

exports.setDeadline = async (req, res) => {
  try {
    const deadline = new Deadline({
      studentdeadline: req.body.studentdeadline,
      staffdeadline: req.body.staffdeadline
    });

    if (deadline.studentdeadline == ""|| deadline.staffdeadline == "") {
    return res.status(400).json({
      error: "Missing user input"});
    }

    let isDeadline = await Deadline.countDocuments();
    console.log(isDeadline);
    if (isDeadline >= 1)
    {
        console.log("Lets go");
        await Deadline.deleteMany({});
        let test = await Deadline.countDocuments();
        console.log(test);
    }
    let userdl = await deadline.save();
    console.log(userdl);
    // const token = await user.generateAuthToken(); 
    // here it is calling the method that we created in the model
    res.status(201).json({ userdl });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.getStudentDeadline = async (req, res) => {
  try {
    let stDeadline = await Deadline.find({ }, {studentdeadline:1, _id:0});
    console.log(stDeadline);
    console.log("Success we found the deadline");
    res.status(201).json({ stDeadline });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};   

exports.getStaffDeadline = async (req, res) => {
  try {
    let tcDeadline = await Deadline.find({ }, {staffdeadline:1, _id:0});
    console.log(tcDeadline);
    console.log("Success we found the deadline");
    res.status(201).json({ tcDeadline });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};   