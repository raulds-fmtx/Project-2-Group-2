const router = require("express").Router();
const { Post, Comment, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username", "id", "profile_pic"],
        },
      ],
    });

    if (req.session.logged_in) {
      const userPostData = await Post.findAll({
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

      const user = await User.findByPk(req.session.user_id, {
        include: [
          {
            model: User,
            as: "followers",
            attributes: ["id", "username", "profile_pic"],
          },
          {
            model: User,
            as: "following",
            attributes: ["id", "username", "profile_pic"],
          },
        ],
      });

      const posts = postData.map((post) => post.get({ plain: true }));
      const userPosts = userPostData.map((post) => post.get({ plain: true }));
      let numLikes = 0;
      for (let i = 0; i < userPosts.length; ++i) {
        numLikes += userPosts[i].numLikes;
      }
      const numFollowers = user.followers.length;
      const numFollowing = user.following.length;
      const userProfilePic = user.profile_pic;
      let following = user.following.map((userFollowing) => userFollowing.get({ plain: true }));
      let followers = user.followers.map((userFollower) => userFollower.get({ plain: true }));
      const mutuals = following.filter(userFollowing => 
        followers.some(userFollower => 
          userFollowing.id === userFollower.id
      ));

      res.render("homepage", {
        posts,
        userPosts,
        numFollowers,
        numFollowing,
        userProfilePic,
        numLikes,
        mutuals,
        logged_in: req.session.logged_in,
        current_user_id: user.id,
        current_username: user.username,
      });
    } else {
      const posts = postData.map((post) => post.get({ plain: true }));

      console.log(req.session);
      res.render("homepage", {
        posts,
        logged_in: req.session.logged_in,
        current_user_id: req.session.user_id,
      });
    }

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
          model: User,
          attributes: ["username", "id", "profile_pic"],
        },
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
          attributes: ["id", "username", "profile_pic"],
        },
        {
          model: User,
          as: "following",
          attributes: ["id", "username", "profile_pic"],
        },
      ],
    });

    let following = userData.following.map((userFollowing) => userFollowing.get({ plain: true }));
    let followers = userData.followers.map((userFollower) => userFollower.get({ plain: true }));
    const userProfilePic = userData.profile_pic;
    const posts = postData.map((post) => post.get({ plain: true }));
    const user = userData.get({ plain: true });

    res.render("dashboard", {
      posts,
      following,
      followers,
      userProfilePic,
      numFollowers: followers.length,
      numFollowing: following.length,
      ...user,
      logged_in: req.session.logged_in,
      current_user_id: req.session.user_id,
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
            attributes: ["username", "profile_pic"],
          },
        },
        {
          model: User,
          as: "followers",
          attributes: ["id", "username", "profile_pic"],
        },
        {
          model: User,
          as: "following",
          attributes: ["id", "username", "profile_pic"],
        },
      ],
    });

    const user = userData.get({ plain: true });
    user.isFollowing = user.followers.some(
      (follow) => follow.id === req.session.user_id
    );

    let following = user.following;
    let followers = user.followers;
    const mutuals = following.filter((userFollowing) =>
      followers.some((userFollower) => userFollowing.id === userFollower.id)
    );
    const isMutual = mutuals.some((mutual) => mutual.id === req.session.user_id);

    res.render("user", {
      ...user,
      isMutual,
      numFollowers: user.followers.length,
      numFollowing: user.following.length,
      logged_in: req.session.logged_in,
      current_user_id: req.session.user_id,
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

router.get("/chat/:userId", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect("/login");
      return;
    }

    const otherUserId = req.params.userId;
    const currentUserId = req.session.user_id;
    const otherUser = await User.findByPk(otherUserId);
    const currentUser = await User.findByPk(currentUserId);    

    res.render("chat", {
      logged_in: req.session.logged_in,
      current_user_id: currentUserId,
      other_user_id: otherUserId,
      other_username: otherUser.username,
      current_username: currentUser.username,
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
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const post = postData.get({ plain: true });
    res.render("post", {
      ...post,
      currentUserId: req.session.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
