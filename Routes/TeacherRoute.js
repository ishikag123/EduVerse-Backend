const express = require("express");
const { getAllTeachers } = require("../Controllers/TeacherController");
const teacherAuth = require("../Middlewares/teacherAuth");
const router = express.Router();
router.use(teacherAuth);

router.get("/get-all", getAllTeachers);

module.exports = router;
