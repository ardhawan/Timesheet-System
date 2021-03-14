const User = require("../model/User");
const nodemailer = require('nodemailer');

exports.sendStudentEmail = async (req, res) => {
  const senderemail = req.body.senderemail;
  const studentmessage = req.body.studentmessage;
  const password = req.body.password;
  let studentList = await User.find({role:"student"}, {uname:1, _id:0});
  
  if (studentmessage == "") {
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
      pass: password
    }
  });

  var emailList = [];
  for(var i = 0; i < studentList.length; i++)
  {
    emailList.push(studentList[i].uname);
  }

  let mailDetails = {
    from: senderemail,
    to: [],
    bcc: emailList,
    subject: 'Deadline of the project',
    html: studentmessage
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