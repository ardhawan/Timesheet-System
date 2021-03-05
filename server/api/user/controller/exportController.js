const Timesheet = require("../model/Timesheet");
var studentData = {};

exports.getCompleteDetails = async (req, res) => {
  studentData = await Timesheet.find({status: "Completed"}, {employeename:1, jobmodule:1, jobrole:1, submissiondate:1, _id:0});
  console.log(studentData);
  res.status(201).json({ studentData });
};

exports.pdfDocument = async (req, res) => {
  completeData = await Timesheet.find({status: "Completed"}, {employeename:1, emailaddress:1, employeenumber:1, department:1, jobmodule:1, jobrole:1, submissiondate:1, suggestedrate:1, tabledata:1,  _id:0});
  console.log(completeData);
  exportdate = req.body.exportdate;
  console.log(exportdate);
  console.log(studentData);
  res.status(201).json({message: "Success"});
}