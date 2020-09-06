const express = require('express');

const {
  getAllStudent,
  getStudent,
  addStudent,
  deleteStudent,
  updateStudent
} = require('../controllers/students');

const router = express.Router();

router.get('/', getAllStudent);
router.get('/:id', getStudent);
router.post('/', addStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
