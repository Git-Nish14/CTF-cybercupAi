const express = require("express");
const User = require("../models/User");
const Problem = require("../models/Problem");
const Attempt = require("../models/Attempt");
const { auth, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/overview", auth, adminOnly, async (req, res) => {
  try {
    const [
      totalUsers,
      totalProblems,
      totalAttempts,
      totalCorrect,
      totalIncorrect,
    ] = await Promise.all([
      User.countDocuments({}),
      Problem.countDocuments({}),
      Attempt.countDocuments({}),
      Attempt.countDocuments({ result: "correct" }),
      Attempt.countDocuments({ result: "incorrect" }),
    ]);

    return res.json({
      totalUsers,
      totalProblems,
      totalAttempts,
      totalCorrect,
      totalIncorrect,
    });
  } catch (err) {
    console.error("Stats overview error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
