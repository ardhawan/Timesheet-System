const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  employeename: {
    type: String,
    required: [true, "Please Include The Employee Name"]
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
    type: Array,
    required: [true, "Please Include The Employee's Job Role"]
  },
  jobmodule:{
    type: Array,
    required: [true, "Please Include The Employee's Job Module"]
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;