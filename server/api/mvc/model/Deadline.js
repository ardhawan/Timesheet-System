const mongoose = require("mongoose");
const deadlineSchema = new mongoose.Schema({
  studentdeadline: {
    type: String,
    required: [true, "Please Include The Student Deadline"]
  },
  staffdeadline: {
    type: String,
    required: [true, "Please Include The Staff Deadline"]
  },
});

const Deadline = mongoose.model("Deadline", deadlineSchema);
module.exports = Deadline;