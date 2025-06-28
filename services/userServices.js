const User = require('../models/user');

async function createUser(userData) {
  return await User.create(userData);
}

async function findUserByEmail(email) {
  return await User.findOne({ email });
}


async function getUserById(userId) {
  return await User.findById(userId);
}

module.exports = {
  createUser,
  findUserByEmail,
  getUserById
};
