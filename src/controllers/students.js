const Student = require("../models/student");

async function addStudent(req, res) {
  const { lastname, firstname } = res.body;
  const student = new Student({ lastname, firstname });
  await student.save();
  return res.status(201).json(student);
}
async function getStudent(req, res) {
  const { id: code } = req.params;
  const student = await Student.findById(code);
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
  const { id: code } = req.params;
  const { lastname, firstname } = req.body;
  const student = await Student.findByIdUpdate(
    code,
    { lastname, firstname },
    { new: true }
  );
  if (!student) {
    return res.status(404).json("Student Not Found");
  }
  await student.save();
  return res.json(Student);
}
async function deleteStudent(req, res) {
  const { id: code } = req.params;
  const student = await Student.findByIdAndDelete(code);
  if (!student) {
    return res.status(404).json("Student Not Found");
  }
  return res.sendStatus(204);
}

module.exports = {
  addStudent,
  getStudent,
  getAllStudent,
  updateStudent,
  deleteStudent,
};
