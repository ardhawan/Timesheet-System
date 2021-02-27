const Staff = require("../model/Staff");
const Timesheet = require("../model/Timesheet");

exports.registerStaff= async (req, res) => {
  try {
    const staff = new Staff({
      staffname: req.body.staffname,
      staffemail: req.body.staffemail,
      assignedmodule: req.body.assignedmodule
    });
    let staffdata = await staff.save();
    res.status(201).json({ staffdata });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.getStudentDetails = async (req, res) => {
  try { 
    let amInfo = await Staff.find({staffemail: req.params.staffemail}, {assignedmodule:1, _id:0});
    let empInfo = await Timesheet.find({jobmodule: {$in: amInfo[0].assignedmodule}, status: "Pending"}, {employeename:1, jobmodule:1, jobrole:1, submissiondate:1, _id:0});
    res.status(201).json({ empInfo });
  } catch (err) {
    res.status(400).json({ error: "No timesheets" });
  }
};

exports.getTableDetails = async (req, res) => {
  try {
    let tableInfo = await Timesheet.find({employeename: req.params.employeename, jobmodule: req.params.jobmodule, jobrole: req.params.jobrole, submissiondate: req.params.submissiondate}, {tabledata:1, _id:0})
    console.log(tableInfo);
    res.status(201).json({ tableInfo });
  } catch (err) {
    res.status(400).json({ error: "Error in getting the table data" });
  }
}
  
  