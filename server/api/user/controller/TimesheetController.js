const Student = require("../model/Student");

exports.getModuleJobRole = async (req, res) => {
  try {
    let mjInfo = await Student.find({ }, {jobrole:1, module:1, _id:0});
    console.log(mjInfo);
    console.log("Success we found the information");
    res.status(201).json({ mjInfo });
  } catch (err) {
    res.status(400).json({ err: err });
  }
}; 

exports.registerStudent = async (req, res) => {
  try {
    const student= new Student({
      employeename: req.body.employeename,
      employeenumber: req.body.employeenumber,
      department: req.body.department,
      jobrole: req.body.jobrole,
      module: req.body.module
    });
    let stdata = await student.save();
    res.status(201).json({ stdata });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
