const mongoose = require("mongoose");
const staffSchema = new mongoose.Schema({
  staffname: {
    type: String,
    required: [true, "Please Include The Staff Name"]
  },
  staffemail: {
    type: String,
    required: [true, "Please Include The Staff's Email"]
  },
  assignedmodule: {
    type: String,
    required: [true, "Please Include The Staff's Assigned Module"]
  },
});

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;