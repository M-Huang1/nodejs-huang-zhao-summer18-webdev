module.exports = function (app) {
  app.get('/api/user', findAllUsers);
  app.get('/api/user/:userId', findUserById);
  app.post('/api/register', createUser);
  app.get('/api/profile', profile);
  app.put('/api/profile',updateProfile);
  app.delete('/api/profile', deleteUser);
  app.post('/api/logout', logout);
  app.post('/api/login', login);

  var userModel = require('../models/user/user.model.server');

  function login(req, res) {
    var credentials = req.body;
    userModel
      .findUserByCredentials(credentials)
      .then(function(user) {
        req.session['currentUser'] = user;
        console.log(req.session['currentUser']._id);
        res.json(user);
      })
  }

  function logout(req, res) {
    req.session.destroy();
    res.send(200);
  }

  function findUserById(req, res) {
    var id = req.params['userId'];
    userModel.findUserById(id)
      .then(function (user) {
        res.json(user);
      })
  }

  function profile(req, res) {
    res.send(req.session['currentUser']);
  }

  function updateProfile(req, res) {
    var user = req.body;
    userModel.updateUser(user, req.session['currentUser']._id)
        .then(function () {
          res.send(200);
        })
  }
  function deleteUser(req, res){
    userModel.deleteUser(req.session['currentUser']._id)
        .then(function(){
          res.send(200);
        })
  }
  function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user)
      .then(function (user) {
        req.session['currentUser'] = user;
        res.send(user);
      })
  }

  function findAllUsers(req, res) {
    userModel.findAllUsers()
      .then(function (users) {
        res.send(users);
      })
  }
}
