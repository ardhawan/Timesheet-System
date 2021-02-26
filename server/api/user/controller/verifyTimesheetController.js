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
    let empInfo = await Timesheet.find({jobmodule: {$in: amInfo[0].assignedmodule}, status: "Pending"}, {employeename:1, jobmodule:1, jobrole:1, submissiondate:1, status:1,_id:0});
    res.status(201).json({ empInfo });
  } catch (err) {
    res.status(400).json({ error: "No timesheets" });
  }
};
  
  