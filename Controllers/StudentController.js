const bcrypt = require("bcrypt");
const Student = require("../Models/student");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const createToken = (id) => {
  return jwt.sign({ id }, secret, { expiresIn: "1d" });
};
//student login
const loginStudent = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Student.findOne({ email });
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
const registerStudent = async (req, res) => {
  const {
    name,
    password,
    email,
    phone,
    DOB,
    address,
    Gname,
    Gphone,
    GEmail,
    courses,
  } = req.body;
  try {
    let existEmail = await Student.findOne({ email });
    if (existEmail) {
      return res.status(400).json("Email already in use!!");
    }
    let existPhone = await Student.findOne({ phone });
    if (existPhone) {
      return res.status(400).json("Phone number already in use!!");
    }
    let user = new Student({
      name,
      password,
      email,
      phone,
      DOB,
      address,
      Gname,
      Gphone,
      GEmail,
      courses,
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

const getAllStudents = async (req, res) => {
  try {
    const users = await Student.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getStudent = async (req, res) => {
  try {
    const email = req.params.id;
    const user = await Student.findOne({ email });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const wishlistCourse = async (req, res) => {
  try {
    const { cname, cid, _id } = req.body;
    const student = await Student.findByIdAndUpdate({ _id });
    if (!student) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (!student.wishlist) {
      student.wishlist = [];
    }
    student.wishlist.push({
      cid: cid,
      cname: cname,
    });
    await student.save();

    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginStudent,
  registerStudent,
  getAllStudents,
  getStudent,
  wishlistCourse,
};
