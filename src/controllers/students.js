const Student = require("../models/student");
const Course = require("../models/course");
const Joi = require("joi");
const courses = require("./courses");
async function addStudent(req, res) {
  const { lastname, firstname } = res.body;
  const schema = Joi.object({
    lastname: Joi.string()
      .required()
      .regex(/^[a-zA-Z]$/)
      .max(10),
    firstname: Joi.string()
      .required()
      .regex(/^[a-zA-Z]$/)
      .max(10),
  });
  schema.validateAsync(req.body);
  const student = new Student({ lastname, firstname });
  await student.save();
  return res.status(201).json(student);
}

async function getStudent(req, res) {
  const { id } = req.params;
  const student = await Student.findById(id).exec();
  if (!student) {
    return res.status(404).json("student Not Found");
  }
  return res.json(student);
}

async function getAllStudent(req, res) {
  const student = await Student.find().exec();
  return res.json(student);
}

async function updateStudent(req, res) {
  const { id } = req.params;
  const { lastname, firstname } = req.body;
  const student = await Student.findByIdUpdate(
    id,
    { lastname, firstname },
    { new: true }
  ).exec();
  if (!student) {
    return res.status(404).json("Student Not Found");
  }
  await student.save();
  return res.json(student);
}
async function deleteStudent(req, res) {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id).exec();
  if (!student) {
    return res.status(404).json("Student Not Found");
  }
  return res.sendStatus(204);
}

async function addCourse(req, res) {}
const { id, code } = req.params;
const course = await Course.findById(code).exec();
const student = await Student.findById(id).exec();
if (!course || !student) {
  return res.status(404).json("Not Exist");
}
student.courses.addToSet(course._id);
course.student.addToSet(student._id);
await student.save();
await course.save();
return res.json(student);

async function removeCourse(req, res) {
  const { id, code } = req.params;
  const course = await Course.findById(code).exec();
  const student = await Student.findById(id).exec();
  if (!course || !student) {
    return res.status(404).json("Not Exist");
  }
  student.courses.pull(course._id);
  // if (student.course.map((i) => i.toString()).includes(course._id)){

  // }
  course.student.pull(student._id);
  await student.save();
  await course.save();
  return res.sendStatus(204);
}
module.exports = {
  addStudent,
  getStudent,
  getAllStudent,
  updateStudent,
  deleteStudent,
  addCourse,
  removeCourse,
};
