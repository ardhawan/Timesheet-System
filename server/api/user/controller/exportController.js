const Timesheet = require("../model/Timesheet");
const nodemailer = require('nodemailer');
var pdf = require('pdfkit');
var fs = require('fs');

exports.getCompleteDetails = async (req, res) => {
  let studentData = await Timesheet.find({status: "Completed"}, {employeename:1, jobmodule:1, jobrole:1, submissiondate:1, _id:0});
  res.status(201).json({studentData});
};

exports.pdfDocument = async (req, res) => {
  let completeData = await Timesheet.find({status: "Completed"}, {employeename:1, emailaddress:1, employeenumber:1, department:1, jobmodule:1, jobrole:1, submissiondate:1, suggestedrate:1, tabledata:1,  _id:0});
  exportdate = req.body.exportdate;

  var timesheetDocument = new pdf;
  timesheetDocument.pipe(fs.createWriteStream('timesheet.pdf'));

  timesheetDocument.image('../client/authapp/src/assets/logo-white.png', {width: 200});
  timesheetDocument.moveDown(1);
  timesheetDocument.font('Times-Roman').fontSize(25).text('Monthly Paid Timesheet: ' + exportdate, {align: 'center', lineGap: 15});

  for(let i = 0; i < completeData.length; i++) {
    timesheetDocument.fontSize(20).fill('blue').text('Record Number ' + (i+1), {lineGap: 10, underline: true});
    timesheetDocument.fontSize(15).fill('black').text('Student Name: ' + completeData[i].employeename, {lineGap: 5});
    timesheetDocument.text('Student Email Address: ' + completeData[i].emailaddress, {lineGap: 5});
    timesheetDocument.text('Student Employee Number: ' + completeData[i].employeenumber, {lineGap: 5});
    timesheetDocument.text('Student Department: ' + completeData[i].department, {lineGap: 5});
    timesheetDocument.text('Student Job Role: ' + completeData[i].jobrole, {lineGap: 5});
    timesheetDocument.text('Student Job Module: ' + completeData[i].jobmodule, {lineGap: 5});
    timesheetDocument.text('Timesheet Submission Date: ' + completeData[i].submissiondate, {lineGap: 5});

    if(completeData[i].suggestedrate == "Same") {
      timesheetDocument.text('Staff Suggested Rate: No Changes ', {lineGap: 5});
    }
    else {
      timesheetDocument.text('Staff Suggested Rate: £'  + completeData[i].suggestedrate, {lineGap: 5});
    }

    timesheetDocument.text('Student Timetable:', {lineGap: 5});
    let tableValue = completeData[i].tabledata;
    let totalWeeks = 1;

    for(let j = 0; j< tableValue.length; j++) {
      if(tableValue[j].weekname == "Week 1" && totalWeeks == 1) {
        timesheetDocument.text('Week 1', {lineGap: 5, underline: true});
        totalWeeks++;
      }
      else if(tableValue[j].weekname == "Week 2" && totalWeeks == 2) {
        timesheetDocument.text('Week 2', {lineGap: 5, underline: true});
        totalWeeks++;
      }
      else if(tableValue[j].weekname == "Week 3" && totalWeeks == 3) {
        timesheetDocument.text('Week 3', {lineGap: 5, underline: true});
        totalWeeks++;
      }
      else if(tableValue[j].weekname == "Week 4" && totalWeeks == 4) {
        timesheetDocument.text('Week 4', {lineGap: 5, underline: true});
        totalWeeks++;
      }
      else if(tableValue[j].weekname == "Week 5" && totalWeeks == 5) {
        timesheetDocument.text('Week 5', {lineGap: 5, underline: true});
        totalWeeks++;
      }
      timesheetDocument.text(j+1 + '.   Date: ' + tableValue[j].weekdate, {lineGap: 5});
      timesheetDocument.text('      Day: ' + tableValue[j].weekday, {lineGap: 5});
      timesheetDocument.text('      Hours: ' + tableValue[j].workhours + ' hrs', {lineGap: 5});
    }
    timesheetDocument.text('Timesheet have been verified electronically', {lineGap: 15});
  }
  timesheetDocument.end();
  res.status(201).json({message: "Success in creating pdf document"});
};

exports.notifyDepartment = async (req, res) => {
  const senderemail = req.body.senderemail;
  const message = req.body.message;
  const senderpassword = req.body.senderpassword;

  if (message == "") {
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
    to: "arnavrajdhawan@hotmail.com",
    subject: 'Export Timesheet',
    attachments: [ 
      {  
        filename: 'timesheet.pdf',
        path: '../server/timesheet.pdf'
      }
    ],
    html: message
  };
    
  mailTransporter.sendMail(mailDetails, function(err, info) { 
    if(err) { 
      console.log(err.responseCode);
      res.status(err.responseCode).json({error: "Fail to send message"});
    } 
    else {
      console.log('Email sent successfully to human resource department: ' + info.messageId); 
      res.status(200).json({message: "Email has been sent to hrd"});
    } 
  });
};