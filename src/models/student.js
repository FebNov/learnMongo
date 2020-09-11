const mongoose = require("mongoose");
const Joi = require("joi");
const schema = new mongoose.Schema({
  // student
  _id: {
    type: String,
    uppercase: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => {
        return !Joi.string().email().validate(email).error;
      },
      msg: "Invalid Email Format",
    },
  },
  courses: [{ type: String, ref: "Course" }],
  lastname: {
    type: String,
    required: true,
    uppercase: true,
  },
  firstname: {
    type: String,
    required: true,
    uppercase: true,
  },
});

const Student = mongoose.model("Student", schema);

module.exports = Student;
