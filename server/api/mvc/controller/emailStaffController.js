const User = require("../model/User");
const nodemailer = require('nodemailer');

exports.sendStaffEmail = async (req, res) => {
  const senderemail = req.body.senderemail;
  const staffmessage = req.body.staffmessage;
  const password = req.body.password;
  let staffList = await User.find({role:"staff"}, {uname:1, _id:0});

  if (staffmessage == "") {
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

  var sfemailList = [];
  for(var i = 0; i < staffList.length; i++)
  {
    sfemailList.push(staffList[i].uname);
  }

  let mailDetails = {
    from: senderemail,
    to: [],
    bcc: sfemailList,
    subject: 'Deadline of the project',
    html: staffmessage
  };

  mailTransporter.sendMail(mailDetails, function(err, info) { 
    if(err) { 
      console.log(err.responseCode);
      res.status(err.responseCode).json({error: "Fail to send message"});
    } 
    else {
      console.log('Email sent successfully to student: ' + info.messageId); 
      res.status(200).json({message: "Email has been sent to staff"});
    } 
  });
};