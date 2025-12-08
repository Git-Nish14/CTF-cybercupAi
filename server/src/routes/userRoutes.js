const express = require("express");
const { auth, adminOnly } = require("../middleware/auth");
const User = require("../models/User");
const Attempt = require("../models/Attempt");

const router = express.Router();

// GET /api/users  (admin only) - list all users
router.get("/", auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find({}, "name email isAdmin createdAt");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/users/:id  (admin only) - single user
router.get("/:id", auth, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id,
      "name email isAdmin createdAt"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/users/:id/attempts  (admin only) - all attempts of a user
router.get("/:id/attempts", auth, adminOnly, async (req, res) => {
  try {
    const attempts = await Attempt.find({ userId: req.params.id })
      .populate("problemId", "title difficulty")
      .sort({ createdAt: -1 });

    res.json(attempts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
