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
  birthDate: {
    type: Date,
  },
  address: {
    type: String,
    required: true,
  },
  guardName: {
    type: String,
  },
  guardEmail: {
    type: String,
  },
  guardPhone: {
    type: String,
  },
});

module.exports = mongoose.model("Student", studentSchema);
