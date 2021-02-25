const Staff = require("../model/Staff");

exports.registerStaff= async (req, res) => {
    try {
      const staff = new Staff({
        staffname: req.body.staffname,
        staffemail: req.body.staffemail,
        assignedmodule: req.body.assignedmodule
      });
      let staffdata = await staff.save();
      res.status(201).json({ staffdata });
    } catch (err) {
      res.status(400).json({ err: err });
    }
  };
  