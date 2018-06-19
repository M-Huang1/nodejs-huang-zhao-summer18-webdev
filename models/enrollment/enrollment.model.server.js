var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
  'EnrollmentModel',
  enrollmentSchema
);

function enrollStudentInSection(enrollment) {
  return enrollmentModel.create(enrollment);
}


function findSectionsForStudent(studentId) {
  return enrollmentModel
    .find({student: studentId})
    .populate('section')
    .exec();
}

function deleteEnrollmentById(studentId, sectionId){
  return enrollmentModel.deleteOne({'student': studentId, 'section':sectionId})
}

function deleteEnrollmentsBySectionId(sectionId){
  return enrollmentModel.deleteOne({'section': sectionId})
}

function deleteEnrollmentsByUserId(userId){
  return enrollmentModel.deleteOne({'student': userId})
}
module.exports = {
  enrollStudentInSection: enrollStudentInSection,
  findSectionsForStudent: findSectionsForStudent,
  deleteEnrollmentById: deleteEnrollmentById,
  deleteEnrollmentsBySectionId:  deleteEnrollmentsBySectionId,
  deleteEnrollmentsByUserId: deleteEnrollmentsByUserId
};
