const Course = require("../models/course");
const Student = require("../models/student");

async function addCourse(req, res) {
  const { name, code, description } = req.body;

  const existingCourse = await Course.findById(code).exec();
  if (existingCourse) {
    return res.status(409).json("Duplicate course code");
  }

  const course = new Course({ code, name, description });
  await course.save();
  return res.status(201).json(course);
}

async function getCourse(req, res) {
  const { id: code } = req.params;
  const course = await Course.findById(code).populate("students").exec();
  if (!course) {
    return res.status(404).json("course not found");
  }
  return res.json(course);
}

async function getAllCourses(req, res) {
  const courses = await Course.find().exec();
  return res.json(courses);
}

async function updateCourse(req, res) {
  const { id: code } = req.params;

  const { name, description } = req.body;

  const course = await Course.findByIdAndUpdate(
    code,
    { name, description },
    { new: true }
  ).exec();

  if (!course) {
    return res.status(404).json("course not found");
  }

  await course.save();

  return res.json(course);
}
async function deleteCourse(req, res) {
  const { id: code } = req.params;
  const course = await Course.findByIdAndDelete(code).exec();

  if (!course) {
    return res.status(404).json("course not found");
  }

  await Student.updateMany(
    { courses: course._id },
    {
      $pull: {
        courses: course._id,
      },
    }
  ).exec();

  return res.sendStatus(204);
}

module.exports = {
  addCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
};
