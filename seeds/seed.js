const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');


const seedUsers = require('./userSeeds');
const seedPosts = require('./postSeeds');
const seedComments = require('./commentSeeds');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("\n -----DATABASE SYNCED-----\n")

  await seedUsers()
  console.log("\n -----USERS SYNCED-----\n")

  await seedPosts()
  console.log("\n -----POSTS SYNCED-----\n")

  await seedComments()
  console.log("\n -----COMMENTS SYNCED-----\n")


  // const users = await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  // for (const project of projectData) {
  //   await Project.create({
  //     ...project,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
