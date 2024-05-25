const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
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
  altPhone: {
    type: String,
  },
  skills: {
    type: String,
  },
  experience: {
    type: Number,
  },
  rating: {
    type: Number,
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
