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
    const created_by = req.params.id;
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
        enrolled: 1,
        joined_students: 1,
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

const enrollStudent = async (req, res) => {
  try {
    const { cid, email } = req.body;
    const _id = cid;
    const course = await Courses.findByIdAndUpdate({ _id });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.joined_students.includes(email)) {
      return res.status(400).json({ message: "Student already enrolled" });
    }

    course.joined_students.push(email);
    await course.save();

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const unEnroll = async (req, res) => {
  try {
    const { cid, email } = req.body;
    const _id = cid;
    const course = await Courses.findByIdAndUpdate(
      _id,
      { $pull: { joined_students: email } },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findEnrolledCourses = async (req, res) => {
  try {
    const email = req.params.id;
    const courses = await Courses.find(
      { joined_students: email },
      {
        _id: 1,
        cname: 1,
        endDate: 1,
      }
    );

    if (!courses) {
      return res.status(400).json("No courses found");
    }
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const courseComment = async (req, res) => {
  try {
    const { cid, comment } = req.body;
    const _id = cid;
    const course = await Courses.findByIdAndUpdate({ _id });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    course.comment.push(comment);
    await course.save();

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const rateCourse = async (req, res) => {
  try {
    const { cid, rating } = req.body;
    const course = await Courses.findById({ _id: cid });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (!course.rating) {
      course.rating = [];
    }

    course.rating.push(rating);
    await course.save();

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editCourse = async (req, res) => {
  try {
    const {
      _id,
      cname,
      topic,
      description,
      duration,
      timing,
      location,
      category,
      level,
      startDate,
      endDate,
      enrollmentLastDate,
      seats,
      fees,
      prereq,
      demo,
    } = req.body;
    const course = await Courses.findByIdAndUpdate(
      _id,
      {
        cname: cname,
        topic: topic,
        description: description,
        duration: duration,
        timing: timing,
        location: location,
        category: category,
        level: level,
        startDate: startDate,
        endDate: endDate,
        enrollmentLastDate: enrollmentLastDate,
        seats: seats,
        fees: fees,
        prereq: prereq,
        demo: demo,
      },
      { new: true } // This option returns the updated document
    );

    // Check if the student was found and updated
    if (!course) {
      return res.status(404).send({ message: "Course not found" });
    }

    res.status(200).send(course);
  } catch (error) {
    res.status(500).send({ message: "Error updating course", error });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourse,
  findAllCourses,
  enrollStudent,
  unEnroll,
  findEnrolledCourses,
  courseComment,
  rateCourse,
  editCourse,
};
