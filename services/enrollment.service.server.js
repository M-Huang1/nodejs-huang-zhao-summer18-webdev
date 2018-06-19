module.exports = function (app) {
  app.post('/api/student/:sid/section/:kid/enroll', enrollStudentInSection);
  app.get('/api/student/:sid/section', findSectionsForStudent);
  app.delete('/api/student/:sid/section/:kid', deleteEnrollmentById);


  var sectionModel = require('../models/section/section.model.server');
  var enrollmentModel = require('../models/enrollment/enrollment.model.server');

  function enrollStudentInSection(req, res) {
    var sectionId = req.params['kid'];
    var studentId = req.params['sid'];
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

  function deleteEnrollmentById(req,res){
    var studentId = req.params['sid'];
    var sectionId = req.params['kid'];
    enrollmentModel.deleteEnrollmentById(studentId,sectionId).then(function(enrollment) {
      sectionModel
          .incrementSectionSeats(sectionId)
          .then(function (enrollment) {
            res.json(enrollment);
          })
    });

  }

  function findSectionsForStudent(req, res) {
    var studentId = req.params['sid'];
    enrollmentModel
        .findSectionsForStudent(studentId)
        .then(function(enrollments) {
          res.json(enrollments);
        });
  }
};