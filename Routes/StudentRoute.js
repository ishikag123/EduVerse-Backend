const express = require("express");
const studentAuth = require("../Middlewares/studentAuth");
const { getAllStudents } = require("../Controllers/StudentController");
const router = express.Router();
router.use(studentAuth);

router.get("/get-all", getAllStudents);

module.exports = router;
