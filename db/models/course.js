const mongoose = require('mongoose');

const Course = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  teacher: { type: String, required: true },
  description: { type: String },
  period: { type: String, required: true },
  participants: { type: Array },
  messages: { type: Array},
  homeworks: { type: Array},
  exams: { type: Array},
  surveys: { type: Array},


});

module.exports = mongoose.model('course', Course);
