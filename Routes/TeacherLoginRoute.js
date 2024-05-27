const express = require("express");
const {
  loginTeacher,
  registerTeacher,
} = require("../Controllers/TeacherController");
const router = express.Router();

router.post("/login", loginTeacher);
router.post("/register", registerTeacher);

module.exports = router;
