const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const Teacher = require("../Models/teacher");

const teacherAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required!!" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, secret);
    req.user = await Teacher.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Request not authorized" });
  }
};

module.exports = teacherAuth;
