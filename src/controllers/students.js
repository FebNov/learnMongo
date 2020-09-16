const Student = require("../models/student");
const Course = require("../models/course");

async function addStudent(req, res) {
  const { firstName, lastName, email } = req.body;

  const student = new Student({
    firstName,
    lastName,
    email,
  });
  await student.save();
  return res.json(student);
}

async function getStudent(req, res) {
  const { id } = req.params;
  const student = await Student.findById(id)
    .populate("courses", "code name")
    .exec();
  if (!student) {
    return res.status(404).json("student not found");
  }
  return res.json(student);
}

async function getAllStudent(req, res) {
  const { page = 1, pageSize = 10, q = "", fields } = req.query;

  const limit = Math.max(pageSize * 1, 10);
  const skip = (Math.max(page * 1, 1) - 1) * limit;
  const students = await Student.find().limit(limit).skip(skip).exec();

  return res.json(students);
}

async function updateStudent(req, res) {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  const newStudent = await Student.findByIdAndUpdate(
    id,
    { firstName, lastName, email },
    {
      new: true,
    }
  ).exec();
  if (!newStudent) {
    return res.status(404).json("course not found");
  }
  return res.json(newStudent);
}

async function deleteStudent(req, res) {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id).exec();
  if (!student) {
    return res.status(404).json("student not found");
  }

  await Course.updateMany(
    { _id: { $in: student.courses } },
    {
      $pull: {
        students: student._id,
      },
    }
  ).exec();

  return res.sendStatus(204);
}

async function addCourse(req, res) {
  // get student id, get course code
  const { id, code } = req.params;
  // find course
  const course = await Course.findById(code).select("students").exec();
  const student = await Student.findById(id).select("courses").exec();
  // find student
  // check student or course not exist
  if (!student || !course) {
    return res.status(404).json("student or course not found");
  }
  // add course to student
  // the same student should not add the same course twice
  student.courses.addToSet(course._id);

  // add student to course
  course.students.addToSet(student._id);

  await student.save();
  await course.save();

  return res.json(student);
}

async function removeCourse(req, res) {
  const { id, code } = req.params;

  const course = await Course.findById(code).select("students").exec();
  const student = await Student.findById(id).select("courses").exec();

  if (!student || !course) {
    return res.status(404).json("student or course not found");
  }

  student.courses.pull(course._id);

  course.students.pull(student._id);

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
