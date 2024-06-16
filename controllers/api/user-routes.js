const router = require("express").Router();
const { User } = require("../../models");
const { Op } = require("sequelize");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);
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

// Route to fetch users for autocomplete
router.get('/search-users', async (req, res) => {
  try {
      const term = req.query.term;
      const users = await User.findAll({
          where: {
              username: {
                  [Op.like]: `%${term}%`  // Adjust based on your search criteria
              }
          },
          attributes: ['id', 'username'] // Fetch only necessary attributes
      });

      // Map users to format expected by autocomplete widget
      const formattedUsers = users.map(user => ({
          label: user.username,  // This is crucial for autocomplete to display usernames
          value: user.id,        // Optionally include value if needed
          user: user             // Optionally include full user object if needed
      }));

      res.json(formattedUsers);  // Send formatted data as JSON response
  } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;