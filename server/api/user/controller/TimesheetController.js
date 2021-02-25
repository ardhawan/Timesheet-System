const Student = require("../model/Student");
const Timesheet  = require("../model/Timesheet");

exports.getJobModuleRole = async (req, res) => {
  try {
    let mjInfo = await Student.find({emailaddress: req.params.emailaddress}, {jobrole:1, jobmodule:1, _id:0});
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
      emailaddress: req.body.emailaddress,
      employeenumber: req.body.employeenumber,
      department: req.body.department,
      jobrole: req.body.jobrole,
      jobmodule: req.body.jobmodule
    });
    let stdata = await student.save();
    res.status(201).json({ stdata });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.storeTimesheetInfo = async (req, res) => {
  try {
    let employeeInfo = await Student.find({emailaddress: req.body.emailaddress}, {employeename:1, emailaddress:1, employeenumber:1, department:1, _id: 0});
    const timesheet = new Timesheet({
      employeename: employeeInfo[0].employeename,
      emailaddress: employeeInfo[0].emailaddress,
      employeenumber: employeeInfo[0].employeenumber,
      department: employeeInfo[0].department,
      jobrole: req.body.jobrole,
      jobmodule: req.body.jobmodule,
      submissiondate: req.body.submissiondate,
      status: "Pending",
      tabledata: req.body.tabledata
    });

    if (timesheet.submissiondate == ""|| timesheet.jobrole == "" || timesheet.jobmodule == "") {
    return res.status(400).json({
      error: "Missing user input"});
    }

    let timesheetDetails = await timesheet.save();
    res.status(201).json({timesheetDetails});
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
