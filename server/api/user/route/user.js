const express = require("express");
const router = express.Router();
// const auth = require("../../../config/auth");
const userController = require("../controller/userController");
const deadlineController = require("../controller/deadlineController");
const emailStudentController = require("../controller/emailStudentController");
const emailStaffController = require("../controller/emailStaffController");

router.post("/login", userController.loginUser);
router.post("/register", userController.registerNewUser);
router.get("/getstudentd", deadlineController.getStudentDeadline);
router.get("/getstaffd", deadlineController.getStaffDeadline);
router.post("/setd", deadlineController.setDeadline);
router.post("/sendstudentm", emailStudentController.sendStudentEmail);
router.post("/sendstaffm", emailStaffController.sendStaffEmail);

module.exports = router;