var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
  return sectionModel.create(section);
}

function findSectionById(sectionId){
  return sectionModel.find({_id:sectionId});
}

function findSectionsForCourse(courseId) {

  return sectionModel.find({courseId: courseId});

}

function decrementSectionSeats(sectionId) {
  return sectionModel.update({
      _id: sectionId
    }, {
      $inc: {currentSeats: -1}
    });

}

function incrementSectionSeats(sectionId) {
  return sectionModel.update({
    _id: sectionId
  }, {
    $inc: {currentSeats: +1}
  });
}

module.exports = {
  createSection: createSection,
  findSectionById: findSectionById,
  findSectionsForCourse: findSectionsForCourse,
  decrementSectionSeats: decrementSectionSeats,
  incrementSectionSeats: incrementSectionSeats
};
