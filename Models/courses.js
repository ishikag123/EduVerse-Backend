const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  cname: {
    type: String,
    required: true,
  },
  teacher_name: {
    type: String,
  },
  topic: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  level: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  enrollmentLastDate: {
    type: Date,
    required: true,
  },
  enrolled: {
    type: Number,
  },
  seats: {
    type: Number,
    required: true,
  },
  fees: {
    type: String,
    required: true,
  },
  prereq: {
    type: String,
  },
  rating: {
    type: [Number],
  },
  comment: {
    type: [String],
  },
  demo: {
    type: String,
    //required: true,
  },
  joined_students: {
    type: [String],
  },
});

module.exports = mongoose.model("Courses", courseSchema);
