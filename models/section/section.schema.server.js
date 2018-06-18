var mongoose = require('mongoose');
var sectionSchema = mongoose.Schema({
  name: String,
  currentSeats: Number,
  maxSeats: Number,
  courseId: Number
}, {collection: 'section'});
module.exports = sectionSchema;
