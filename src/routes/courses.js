const express = require("express");

const {
  getAllCourses,
  getCourse,
  addCourse,
  deleteCourse,
  updateCourse,
} = require("../controllers/courses");

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCourse);
router.post("/", addCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
