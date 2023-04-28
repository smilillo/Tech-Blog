const { Post } = require('../models');

const postData = [
  {
    title: "",
    post_content: "",
    user_id: 1
  },
  {
  title: "",
  post_content: "",
  user_id: 1
  },
  {
    title: "",
    post_content: "",
    user_id: 1
  },
  {
    title: "",
    post_content: "",
    user_id: 1
  }
];

const seedPosts = () => Comment.bulkCreate(posttData);

module.exports = seedPosts;
