const Staff = require("../model/Staff");
const Timesheet = require("../model/Timesheet");
const nodemailer = require('nodemailer');
var rowInfo = {};

exports.registerStaff = async (req, res) => {
  try {
    const staff = new Staff({
      staffname: req.body.staffname,
      staffemail: req.body.staffemail,
      assignedmodule: req.body.assignedmodule
    });
    let staffdata = await staff.save();
    res.status(201).json({staffdata});
  } catch (err) {
    res.status(400).json({err: err});
  }
};

exports.getStudentDetails = async (req, res) => {
  let empInfo = await Staff.find({staffemail: req.params.staffemail}, {assignedmodule:1, _id:0});
  if(empInfo != "") {
    empInfo = await Timesheet.find({jobmodule: {$in: empInfo[0].assignedmodule}, status: "Pending"}, {employeename:1, jobmodule:1, jobrole:1, submissiondate:1, _id:0});
  }
  res.status(201).json({ empInfo });
};

exports.getTableDetails = async (req, res) => {
  try {
    rowInfo = {
      employeename: req.params.employeename, 
      jobmodule: req.params.jobmodule, 
      jobrole: req.params.jobrole, 
      submissiondate: req.params.submissiondate
    }
    let tableInfo = await Timesheet.find(rowInfo, {tabledata:1, _id:0})
    res.status(201).json({tableInfo});
  } catch (err) {
    res.status(400).json({ error: "Error in getting the table data" });
  }
};

exports.updateTable = async (req, res) => {
  try { 
    await Timesheet.updateOne(rowInfo, {$set: {status: "Completed"}});
    if(!req.body.suggestedrate == "")
    {
      await Timesheet.updateOne(rowInfo, {$set: {suggestedrate: req.body.suggestedrate}});
    }
    rowInfo = {};
    res.status(201).json({message: "Updated status value and suggested rate value"});
  } catch (err) {
    res.status(400).json({error: "Error in updating"});
  }
};

exports.notifyStudent = async (req, res) => {
  const senderemail = req.body.senderemail;
  const message = req.body.message;
  const senderpassword = req.body.senderpassword;
  let receiveremail = await Timesheet.find(rowInfo, {emailaddress:1, _id:0});

  if (rowInfo == "") {
    return res.status(400).json({error: "Missing data"});
  }
  else if (message == "") {
    return res.status(400).json({error: "Missing user input"});
  }

  let mailTransporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", 
    secureConnection: false, 
    port: 587, 
    tls: {
      ciphers:'SSLv3'
    },
    auth: {
      user: senderemail,
      pass: senderpassword
    }
  });

  let mailDetails = {
    from: senderemail,
    to: receiveremail,
    subject: 'Verfiy timesheet details',
    html: message
  };
    
  mailTransporter.sendMail(mailDetails, function(err, info) { 
    if(err) { 
      console.log(err.responseCode);
      res.status(err.responseCode).json({error: "Fail to send message"});
    } 
    else {
      console.log('Email sent successfully to student: ' + info.messageId); 
      res.status(200).json({message: "Email has been sent to student"});
    } 
  });
};

exports.deleteRecord = async (req, res) => {
  await Timesheet.deleteOne(rowInfo);
  rowInfo = {};
  res.status(200).json({message: "Succesful deletion"});
};