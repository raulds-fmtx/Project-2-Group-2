const { User } = require("../models");

const userData = [
  {
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    username: "jane_doe",
    email: "jane@example.com",
    password: "password123",
  },
  {
    username: "sam_smith",
    email: "sam@example.com",
    password: "password123",
  },
];

const seedUsers = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedUsers;
