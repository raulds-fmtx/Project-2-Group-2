const router = require("express").Router();
const { User } = require("../../models");
const upload = require('../../middlewares/upload'); // Import the upload middleware
const { Op } = require('sequelize');

// Signup route
router.post("/signup", upload.single("image"), async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
      profile_pic: req.file ? `/uploads/${req.file.filename}` : null,
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout route
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/search", async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        username: {
          [Op.like]: `%${req.query.term}%`,
        },
        id: {
          [Op.ne]: req.session.user_id, // Exclude the logged-in user
        },
      },
      attributes: ["id", "username"],
    });
    res.json(
      users.map((user) => ({
        label: user.username,
        value: user.id,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;