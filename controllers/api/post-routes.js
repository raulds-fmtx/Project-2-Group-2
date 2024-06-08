const router = require("express").Router();
const { Post, Like, User } = require("../../models");
const withAuth = require("../../utils/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage});

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

// Update post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to like a post
router.put('/like/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      res.status(404).json({ message: 'No post found with this id.'});
    }

    const existingLike = await Like.findOne({
      where: {
        user_id: req.session.user_id,
        post_id: req.params.id,
      }
    });

    if (existingLike) {
      await existingLike.destroy();
      post.numLikes -= 1;
      await post.save();
      res.status(200).json({ numLikes: post.numLikes, liked: false });
    } else {
      await Like.create({
        user_id: req.session.user_id,
        post_id: req.params.id,
      });
      post.numLikes += 1;
      await post.save();
      res.status(200).json({ numLikes: post.numLikes, liked: true});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
