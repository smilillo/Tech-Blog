const { Post } = require('../models');

const postData = [
  {
    title: "Hey",
    post_text: "this is a post!",
    user_id: 1
  },
  {
  title: "Hi",
  post_text: "this is a post!",
  user_id: 2
  },
  {
    title: "What up",
    post_text: "this is a post!",
    user_id: 3
  },
  {
    title: "Yooo",
    post_text: "this is a post!",
    user_id: 4
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
