const Timesheet = require("../model/Timesheet");
var studentData = {};

exports.getCompleteDetails = async (req, res) => {
  studentData = await Timesheet.find({status: "Completed"}, {employeename:1, jobmodule:1, jobrole:1, submissiondate:1, _id:0});
  console.log(studentData);
  res.status(201).json({ studentData });
};

exports.pdfDocument = async (req, res) => {
  exportdate = req.body.exportdate;
  console.log(exportdate);
  console.log(studentData);
  res.status(201).json({message: "Success"});
}