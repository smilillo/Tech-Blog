const { User } = require('../models');

const userData = [
  {
    username: "sofiem",
    password: "password1"
  },
  {
    username: "jaimem",
    password: "password1"
  },
  {
    username: "ruths",
    password: "password1"
  },
  {
    username: "joshd",
    password: "password1"
  },
  {
    username: "chrisa",
    password: "password1"
  }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
