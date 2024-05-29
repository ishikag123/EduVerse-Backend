const Teacher = require("../Models/teacher");
const Courses = require("../Models/courses");

const createCourse = async (req, res) => {
  try {
    const {
      cname,
      topic,
      created_by,
      status,
      description,
      duration,
      timing,
      location,
      category,
      level,
      startDate,
      endDate,
      enrollmentLastDate,
      enrolled,
      seats,
      fees,
      prereq,
      rating,
      comment,
      demo,
      joined_students,
    } = req.body;
    const email = created_by;
    const user = await Teacher.findOne({ email });
    if (!user) {
      return res.status(400).json("Course creator do not exist!!");
    }
    // const created_by = user._id;
    const teacher_name = user.name;
    let course = new Courses({
      cname,
      teacher_name,
      topic,
      created_by,
      status,
      description,
      duration,
      timing,
      location,
      category,
      level,
      startDate,
      endDate,
      enrollmentLastDate,
      enrolled,
      seats,
      fees,
      prereq,
      rating,
      comment,
      demo,
      joined_students,
    });
    await course.save();
    return res.status(200).json({ course });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
//all courses of a teacher
const getAllCourses = async (req, res) => {
  try {
    const { created_by } = req.body;
    // const user = await Teacher.findOne({ email });
    // if (!user) {
    //   return res.status(400).json("Course creator do not exist!!");
    // }
    //const created_by = user._id;
    const courses = await Courses.find(
      { created_by },
      {
        _id: 1,
        cname: 1,
        topic: 1,
        startDate: 1,
        endDate: 1,
        rating: 1,
      }
    );
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
//find course by course_id
const getCourse = async (req, res) => {
  try {
    const _id = req.params.id;
    const course = await Courses.findById({ _id });
    if (!course) {
      return res.status(400).json("Course not found");
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
//get all courses from the database
const findAllCourses = async (req, res) => {
  try {
    const courses = await Courses.find(
      {},
      {
        _id: 1,
        cname: 1,
        topic: 1,
        teacher_name: 1,
        created_by: 1,
        location: 1,
        rating: 1,
      }
    );
    if (!courses) {
      return res.status(400).json("No courses found");
    }
    return res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { createCourse, getAllCourses, getCourse, findAllCourses };
