const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  // student
  _id: {
    type: String,
    uppercase: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", schema);

module.exports = Student;
