const express = require("express");
const {
  getAllTeachers,
  getTeacher,
} = require("../Controllers/TeacherController");
const {
  createCourse,
  getAllCourses,
  getCourse,
} = require("../Controllers/CourseController");
const teacherAuth = require("../Middlewares/teacherAuth");
const router = express.Router();
router.use(teacherAuth);

router.get("/get-all", getAllTeachers);
router.get("/get-teacher/:id", getTeacher);
router.post("/create-course", createCourse);
router.get("/get-my-courses/:id", getAllCourses);
router.get("/get-course/:id", getCourse);

module.exports = router;
