const express = require("express");
const studentAuth = require("../Middlewares/studentAuth");
const {
  getAllStudents,
  getStudent,
} = require("../Controllers/StudentController");
const {
  findAllCourses,
  getCourse,
  getAllCourses,
  enrollStudent,
  unEnroll,
  findEnrolledCourses,
} = require("../Controllers/CourseController");
const {
  getAllTeachers,
  getTeacher,
} = require("../Controllers/TeacherController");
const router = express.Router();
router.use(studentAuth);

router.get("/get-all", getAllStudents);
router.get("/get-student/:id", getStudent);
router.get("/get-all-courses", findAllCourses);
router.get("/get-course/:id", getCourse);
router.get("/get-all-teachers", getAllTeachers);
router.get("/get-teacher/:id", getTeacher);
router.get("/get-courses-of/:id", getAllCourses);
router.put("/enroll", enrollStudent);
router.put("/unenroll", unEnroll);
router.get("/enrolled-courses/:id", findEnrolledCourses);

module.exports = router;
