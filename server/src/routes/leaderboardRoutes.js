const express = require("express");
const Attempt = require("../models/Attempt");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "50", 10);

    const leaderboardRaw = await Attempt.aggregate([
      {
        $group: {
          _id: { userId: "$userId", problemId: "$problemId" },
          attemptsForProblem: { $sum: 1 },
          hasCorrect: {
            $max: {
              $cond: [{ $eq: ["$result", "correct"] }, 1, 0],
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.userId",
          totalAttempts: { $sum: "$attemptsForProblem" },
          solvedCount: { $sum: "$hasCorrect" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $match: {
          "user.isAdmin": { $ne: true },
        },
      },
      {
        $sort: {
          solvedCount: -1,
          totalAttempts: 1,
          "user.name": 1,
        },
      },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          name: "$user.name",
          email: "$user.email",
          solvedCount: 1,
          totalAttempts: 1,
        },
      },
    ]);
    const leaderboard = leaderboardRaw.map((entry, index) => ({
      rank: index + 1,
      ...entry,
    }));

    return res.json(leaderboard);
  } catch (err) {
    console.error("Leaderboard error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
