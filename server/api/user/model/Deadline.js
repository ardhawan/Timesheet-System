const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const deadlineSchema = new mongoose.Schema({
  studentdeadline: {
    type: String,
    required: [true, "Please Include The Student Deadline"]
  },
  teacherdeadline: {
    type: String,
    required: [true, "Please Include The Teacher Deadline"]
  },
});

const Deadline = mongoose.model("Deadline", deadlineSchema);
module.exports = Deadline;