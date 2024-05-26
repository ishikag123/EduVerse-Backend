const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const Student = require("../Models/student");

const studentAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Auth token required!!" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, secret);
    req.user = await Student.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Req not authorized" });
  }
};

module.exports = studentAuth;
