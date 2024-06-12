const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Like = require("./Like");
const Follow = require("./Follow");

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Like, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
})

User.belongsToMany(User, {
  through: Follow,
  as: "followers",
  foreignKey: "following_id",
})

User.belongsToMany(User, {
  through: Follow,
  as: "following",
  foreignKey: "follower_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Post.hasMany(Like, {
  foreignKey: "post_id",
  onDelete: "CASCADE", 
})

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

Like.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Like.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

module.exports = { User, Post, Comment, Like, Follow };
