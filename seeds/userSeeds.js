const { User } = require('../models');

const userData = [
  {
    username: "sofiem",
    email: "sofiem@email.com",
    password: "password1"
  },
  {
    username: "jaimem",
    email: "jaimem@email.com",
    password: "password1"
  },
  {
    username: "ruths",
    email: "ruths@email.com",
    password: "password1"
  },
  {
    username: "joshd",
    email: "joshd@email.com",
    password: "password1"
  },
  {
    username: "chrisa",
    email: "chrisa@email.com",
    password: "password1"
  }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
