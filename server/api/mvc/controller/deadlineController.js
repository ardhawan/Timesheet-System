const Deadline = require("../model/Deadline");

exports.setDeadline = async (req, res) => {
  try {
    const deadline = new Deadline({
      studentdeadline: req.body.studentdeadline,
      staffdeadline: req.body.staffdeadline
    });

    if (deadline.studentdeadline == ""|| deadline.staffdeadline == "") {
      return res.status(400).json({error: "Missing user input"});
    }

    let isDeadline = await Deadline.countDocuments();
    if (isDeadline >= 1)
    {
      await Deadline.deleteMany({});
    }

    let userdl = await deadline.save();
    res.status(201).json({userdl});
  } catch (err) {
    res.status(400).json({err: err});
  }
};

exports.getStudentDeadline = async (req, res) => {
  try {
    let stDeadline = await Deadline.find({ }, {studentdeadline:1, _id:0});
    res.status(201).json({stDeadline});
  } catch (err) {
    res.status(400).json({err: err});
  }
};   

exports.getStaffDeadline = async (req, res) => {
  try {
    let tcDeadline = await Deadline.find({ }, {staffdeadline:1, _id:0});
    res.status(201).json({tcDeadline});
  } catch (err) {
    res.status(400).json({err: err});
  }
};   