module.exports = function (app) {
  app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
  app.get('/api/student/section', findSectionsForStudent);
  app.delete('/api/student/:sid/section/:kid', deleteEnrollment);


  var sectionModel = require('../models/section/section.model.server');
  var enrollmentModel = require('../models/enrollment/enrollment.model.server');

  function enrollStudentInSection(req, res) {
    var sectionId = req.params['sectionId'];
    var currentUser = req.session.currentUser;
    var studentId = currentUser._id;
    var enrollment = {
      student: studentId,
      section: sectionId
    };

    sectionModel
        .findSectionById(sectionId)
        .then(function (section) {
          if (section[0].currentSeats > 0) {
            sectionModel
                .decrementSectionSeats(sectionId)
                .then(function () {
                  return enrollmentModel
                      .enrollStudentInSection(enrollment)
                })
                .then(function (enrollment) {
                  res.json(enrollment);
                })
          }
          else {
            res.json({error: 'Cannot enroll in a full course'})
          }
        })

  }

  function deleteEnrollment(req,res){
    var sectionId = req.params['sid'];
    var studentId
    enrollmentModel.deleteEnrollment(req.s)
  }

  function findSectionsForStudent(req, res) {
    var currentUser = req.session.currentUser;
    var studentId = currentUser._id;
    enrollmentModel
        .findSectionsForStudent(studentId)
        .then(function(enrollments) {
          res.json(enrollments);
        });
  }
};