const express = require("express");
const router = express.Router();
// const auth = require("../../../config/auth");
const userController = require("../controller/userController");
const deadlineController = require("../controller/deadlineController");

router.post("/login", userController.loginUser);
router.post("/register", userController.registerNewUser);
router.get("/getstudentd", deadlineController.getStudentDeadline);
router.post("/setd", deadlineController.setDeadline);

module.exports = router;