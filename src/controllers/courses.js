const Course = require("../models/course");

async function addCourse(req, res) {
  const { name, code, description } = res.body;
  const course = new Course({ name, code, description });
  await course.save();
  return res.status(201).json(course);
}

async function getCourse(req, res) {
  const { id: code } = req.params;
  const course = await Course.findById(code).exec();
  if (!course) {
    return res.status(404).json("course Not Found");
  }
  return res.json(course);
}

async function getAllCourse(req, res) {
  const courses = await Course.find().exec();
  return res.json(courses);
}

async function updateCourse(req, res) {
  const { id: code } = req.params;
  const { name, description } = req.body;
  const course = await Course.findByIdUpdate(
    code,
    { name, description },
    { new: true }
  ).exec();
  if (!course) {
    return res.status(404).json("course Not Found");
  }
  await course.save();
  return res.json(course);
}
async function deleteCourse(req, res) {
  const { id: code } = req.params;
  const course = await Course.findByIdAndDelete(code).exec();
  if (!course) {
    return res.status(404).json("course Not Found");
  }
  return res.sendStatus(204);
}

module.exports = {
  addCourse,
  getCourse,
  getAllCourse,
  updateCourse,
  deleteCourse,
};
