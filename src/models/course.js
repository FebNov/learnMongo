const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  // course code
  _id: {
    type: String,
    uppercase: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'This is default information'
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const Model = mongoose.model('Course', schema);

module.exports = Model;
