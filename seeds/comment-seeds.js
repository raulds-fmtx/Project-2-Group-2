const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "Great article! Very informative.",
    user_id: 2,
    post_id: 1,
  },
  {
    comment_text: "Thanks for sharing!",
    user_id: 3,
    post_id: 1,
  },
  {
    comment_text: "I found this very helpful, thank you!",
    user_id: 1,
    post_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
