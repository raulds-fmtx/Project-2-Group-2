const router = require("express").Router();
const { Follow,  User} = require("../../models");
const withAuth = require("../../utils/auth");

// Follow a user
router.post("/follow", withAuth, async(req,res) => {
    try {
        const followData = await Follow.create({
          following_id: req.body.following_id,
          follower_id: req.session.user_id,
        });

        res.status(200).json(followData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Unfollow a user
router.delete("/unfollow", withAuth, async (req, res) => {
    try {
        const followData = await Follow.destroy({
            where: {
                follower_id: req.session.user_id,
                following_id: req.body.following_id,
            }
        })

        if (!followData) {
            res.status(404).json({ message: "No follow relationship found!" });
            return;
        }

        res.status(200).json(followData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get followers and following for a user
router.get("/:id", withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'followers',
                    attributes: ['id', 'username']
                },
                {
                    model: User,
                    as: 'following',
                    attributes: ['id', 'username']
                }
            ]
        })

        if (!userData) {
            res.status(404).json({ message: "No user found with this id." });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;