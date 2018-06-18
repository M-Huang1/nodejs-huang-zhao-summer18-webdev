var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
  return userModel.findOne(credentials).select("-password");
}

function findUserById(userId) {
  return userModel.findOne({_id: userId});
}

function createUser(user) {
  return userModel.create(user);
}

function findAllUsers() {
  return userModel.find();
}

function updateUser(user, userId){
  return userModel.update(
      {
        _id: userId
      },
      {
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password
      }
  )
}

function deleteUser(userId){
  return userModel.deleteOne({_id: userId})
}
var api = {
  createUser: createUser,
  deleteUser: deleteUser,
  findAllUsers: findAllUsers,
  findUserById: findUserById,
  updateUser: updateUser,
  findUserByCredentials: findUserByCredentials
};

module.exports = api;
