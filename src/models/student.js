const mongoose = require("mongoose");
const Joi = require("joi");

// front -> validator.js
// back -> joi, express-validator
const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (email) => {
          return !Joi.string().email().validate(email).error;
        },
        msg: "Invalid email format",
      },
    },
    courses: [{ type: String, ref: "Course" }],
    __v: {
      type: Number,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.model("Student", schema);

module.exports = Model;
