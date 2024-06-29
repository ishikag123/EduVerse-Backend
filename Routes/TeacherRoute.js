const express = require("express");
const {
  getAllTeachers,
  getTeacher,
  editTeacher,
} = require("../Controllers/TeacherController");
const {
  createCourse,
  getAllCourses,
  getCourse,
  editCourse,
} = require("../Controllers/CourseController");
const { getStudent } = require("../Controllers/StudentController");
const teacherAuth = require("../Middlewares/teacherAuth");
const router = express.Router();
router.use(teacherAuth);

router.get("/get-all", getAllTeachers);
router.get("/get-teacher/:id", getTeacher);
router.post("/create-course", createCourse);
router.get("/get-my-courses/:id", getAllCourses);
router.get("/get-course/:id", getCourse);
router.get("/get-student/:id", getStudent);
router.put("/edit", editTeacher);
router.put("/edit-course", editCourse);

module.exports = router;
