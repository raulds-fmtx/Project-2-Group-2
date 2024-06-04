const { Post } = require("../models");

const postData = [
  {
    title: "Understanding JavaScript Closures",
    content: "JavaScript closures are a fundamental concept in JavaScript...",
    user_id: 1,
  },
  {
    title: "Introduction to Node.js",
    content:
      "Node.js is a runtime environment that allows you to run JavaScript on the server...",
    user_id: 2,
  },
  {
    title: "CSS Grid Layout",
    content:
      "CSS Grid Layout is a two-dimensional layout system for the web...",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
