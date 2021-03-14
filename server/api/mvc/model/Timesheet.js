const mongoose = require("mongoose");
const timesheetSchema = new mongoose.Schema({
  employeename: {
    type: String,
    required: [true, "Please Include The Employee Name"]
  },
  emailaddress: {
    type: String,
    required: [true, "Please Include The Employee's Email"]
  },
  employeenumber: {
    type: String,
    required: [true, "Please Include The Employee Number"]
  },
  department: {
    type: String,
    required: [true, "Please Include The Employee's Department"]
  },
  jobrole: {
    type: String,
    required: [true, "Please Include The Employee's Job Role"]
  },
  jobmodule:{
    type: String,
    required: [true, "Please Include The Employee's Job Module"]
  },
  submissiondate: {
    type: String,
    required: [true, "Please Include The Submission Date"]
  },
  status: {
    type: String,
    required: [true, "Please Include The Timesheet Status"]
  },
  suggestedrate: {
    type: String,
    required: [true, "Please Include The Timesheet's Suggested Rate"]
  },
  tabledata: [{
    weekname: {
      type: String,
      required: [true, "Please Include The Week Name"]
    },
    weekdate: {
      type: String,
      required: [true, "Please Include The Week Date"]
    },
    weekday: {
      type: String,
      required: [true, "Please Include The Week Day"]
    },
    workhours: {
      type: String,
      required: [true, "Please Include The Work Hours"]
    }
  }]
});

const Timesheet = mongoose.model("Timesheet", timesheetSchema);
module.exports = Timesheet;