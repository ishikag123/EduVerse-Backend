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
    const { cname, cid, email } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    if (!student.wishlist) {
      student.wishlist = [];
    }
    const courseExists = student.wishlist.some((course) => course.cid === cid);

    if (courseExists) {
      return res.status(400).json({ message: "Course already in wishlist" });
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

const removeFromWishlist = async (req, res) => {
  try {
    const { cid, _id } = req.body;
    const student = await Student.findByIdAndUpdate(
      _id,
      { $pull: { wishlist: { cid: cid } } },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editStudent = async (req, res) => {
  try {
    const { _id, name, email, phone, DOB, address, Gname, Gphone, GEmail, dp } =
      req.body;
    const student = await Student.findByIdAndUpdate(
      _id,
      {
        name: name,
        email: email,
        phone: phone,
        DOB: DOB,
        address: address,
        Gname: Gname,
        Gphone: Gphone,
        GEmail: GEmail,
        dp: dp,
      },
      { new: true } // This option returns the updated document
    );

    // Check if the student was found and updated
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    res.status(200).send(student);
  } catch (error) {
    res.status(500).send({ message: "Error updating student", error });
  }
};

module.exports = {
  loginStudent,
  registerStudent,
  getAllStudents,
  getStudent,
  wishlistCourse,
  removeFromWishlist,
  editStudent,
};
