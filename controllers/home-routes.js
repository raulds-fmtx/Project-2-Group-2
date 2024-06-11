const router = require("express").Router();
const { Post, Comment, User, Follow } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username", "id"],
        },
      ],
    });
    
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: User,
          as: "followers",
          attributes: ["id", "username"],
        },
        {
          model: User,
          as: "following",
          attributes: ["id", "username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    const user = userData.get({ plain: true });

    res.render("dashboard", {
      posts,
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username", "id"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const userData = await User.findByPk(postData.user.id, {
      include: [
        {
          model: User,
          as: "followers",
          attributes: ["id", "username"],
        },
        {
          model: User,
          as: "following",
          attributes: ["id", "username"],
        },
      ],
    });

    const user = userData.get({ plain: true });
    user.isFollowing = user.followers.some(
      (follow) => follow.id === req.session.user_id
    );

    const post = postData.get({ plain: true });
    res.render("post", {
      ...post,
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          attributes: ["id", "title", "content", "image_url", "numLikes", "createdAt"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          as: "followers",
          attributes: ["id", "username"],
        },
        {
          model: User,
          as: "following",
          attributes: ["id", "username"],
        },
      ],
    });

    const user = userData.get({ plain: true });
    user.isFollowing = user.followers.some(
      (follow) => follow.id === req.session.user_id
    );

    res.render("user", {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
