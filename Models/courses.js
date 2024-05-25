const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
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
  Category: {
    type: String,
  },
  Level: {
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
    type: Number,
  },
  comment: {
    type: [String],
  },
  demo: {
    type: URL,
    required: true,
  },
});

module.exports = mongoose.model("Courses", courseSchema);
