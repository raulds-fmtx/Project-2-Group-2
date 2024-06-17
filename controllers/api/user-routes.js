const router = require("express").Router();
const { Post, Like, User } = require("../../models");
const withAuth = require("../../utils/auth");
const multer = require("multer");
const deleteFile = require("../../utils/file");

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Route to update user profile picture
router.post('/updateUserPic', upload.single('userpic'), async (req, res) => {
  try {
    let userpicPath = null;
    if (req.file) {
      userpicPath = `/uploads/${req.file.filename}`;
    }

    // Assuming you have a user model and want to update the userpic for the current user
    const updatedUser = await User.update(
      { userpic: userpicPath },
      { where: { id: req.session.user_id } }
    );

    res.status(200).json({ success: true, userpicUrl: userpicPath });
  } catch (err) {
    console.error('Error updating user profile picture:', err);
    res.status(500).json({ success: false, error: 'Failed to update user profile picture.' });
  }
});

// Signup route with file upload
router.post("/signup", upload.single('userpic'), async (req, res) => {
  try {
    let userpicPath = null;
    if (req.file) {
      userpicPath = `/uploads/${req.file.filename}`;
    }

    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
      userpic: userpicPath
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Create new post
router.post("/", withAuth, upload.single("image"), async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
      image_url: req.file ? `/uploads/${req.file.filename}` : null,
    });
    res.status(200).json(newPost);
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

module.exports = router;