const express = require("express");
const studentAuth = require("../Middlewares/studentAuth");
const {
  getAllStudents,
  getStudent,
} = require("../Controllers/StudentController");
const {
  findAllCourses,
  getCourse,
} = require("../Controllers/CourseController");
const { getAllTeachers } = require("../Controllers/TeacherController");
const router = express.Router();
router.use(studentAuth);

router.get("/get-all", getAllStudents);
router.get("/get-student/:id", getStudent);
router.get("/get-all-courses", findAllCourses);
router.get("/get-course/:id", getCourse);
router.get("/get-all-teachers", getAllTeachers);
module.exports = router;
