const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  DOB: {
    type: Date,
  },
  address: {
    type: String,
    required: true,
  },
  Gname: {
    type: String,
  },
  GEmail: {
    type: String,
  },
  Gphone: {
    type: String,
  },
  courses: {
    type: [String],
  },
});

module.exports = mongoose.model("Student", studentSchema);
