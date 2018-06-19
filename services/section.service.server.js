module.exports = function (app) {

  app.post('/api/course/:courseId/section', createSection);
  app.get('/api/course/:courseId/section', findSectionsForCourse);
  app.get('/api/section/:sectionId', getSectionById);
  app.delete('/api/section/:sectionId', deleteSectionById);


  var sectionModel = require('../models/section/section.model.server');
  var enrollmentModel = require('../models/enrollment/enrollment.model.server');




  function getSectionById(req, res){
    var sectionId = req.params['sectionId'];
    sectionModel.findSectionById(sectionId)
        .then(function (section){
          res.json(section);
        })
  }

  function deleteSectionById(req, res){
    var sectionId = req.params['sectionId'];
    sectionModel.deleteSection(sectionId)
        .then(function(section){
          res.json(section);
          enrollmentModel.deleteEnrollmentsBySectionId(sectionId);

        })



  }
  function findSectionsForCourse(req, res) {
    var courseId = req.params['courseId'];
    sectionModel
      .findSectionsForCourse(courseId)
      .then(function (sections) {
        res.json(sections);
      })
  }

  function createSection(req, res) {
    var section = req.body;
    sectionModel
      .createSection(section)
      .then(function (section) {
        res.json(section);
      })
  }
};
