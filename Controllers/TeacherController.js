const bcrypt = require("bcrypt");
const Teacher = require("../Models/teacher");
//const Courses = require("../Models/courses");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const createToken = (id) => {
  return jwt.sign({ id }, secret, { expiresIn: "1d" });
};
//student login
const loginTeacher = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Teacher.findOne({ email });
    if (!user) {
      return res.status(400).json("Incorrect credentials!!");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json("Incorrect credentials!!");
    }

    const token = createToken(user._id);
    return res.status(200).json({ email, token });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

//student register
const registerTeacher = async (req, res) => {
  const {
    name,
    password,
    email,
    phone,
    DOB,
    address,
    altPhone,
    skills,
    experience,
    rating,
  } = req.body;
  try {
    let existEmail = await Teacher.findOne({ email });
    if (existEmail) {
      return res.status(400).json("Email already in use!!");
    }
    let existPhone = await Teacher.findOne({ phone });
    if (existPhone) {
      return res.status(400).json("Phone number already in use!!");
    }
    let user = new Teacher({
      name,
      password,
      email,
      phone,
      DOB,
      address,
      altPhone,
      skills,
      experience,
      rating,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const token = createToken(user._id);

    return res.status(200).json({ email, token });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const users = await Teacher.find(
      {},
      {
        email: 1,
        name: 1,
        address: 1,
        rating: 1,
        skills: 1,
      }
    );
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getTeacher = async (req, res) => {
  try {
    const email = req.params.id;
    const user = await Teacher.findOne({ email });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const rateTeacher = async (req, res) => {
  try {
    const { email, rating } = req.body;
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    if (!teacher.rating) {
      teacher.rating = [];
    }

    teacher.rating.push(rating);
    await teacher.save();

    return res.status(200).json(teacher);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const editTeacher = async (req, res) => {
  try {
    const {
      _id,
      name,
      email,
      phone,
      DOB,
      address,
      altPhone,
      skills,
      experience,
      dp,
    } = req.body;
    const teacher = await Teacher.findByIdAndUpdate(
      _id,
      {
        name: name,
        email: email,
        phone: phone,
        DOB: DOB,
        address: address,
        altPhone: altPhone,
        skills: skills,
        experience: experience,
        dp: dp,
      },
      { new: true } // This option returns the updated document
    );

    // Check if the student was found and updated
    if (!teacher) {
      return res.status(404).send({ message: "Teacher not found" });
    }

    res.status(200).send(teacher);
  } catch (error) {
    res.status(500).send({ message: "Error updating teacher", error });
  }
};
module.exports = {
  loginTeacher,
  registerTeacher,
  getAllTeachers,
  getTeacher,
  rateTeacher,
  editTeacher,
};
