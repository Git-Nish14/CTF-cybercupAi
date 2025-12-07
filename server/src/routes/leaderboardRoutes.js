// src/routes/leaderboardRoutes.js
const express = require("express");
const Attempt = require("../models/Attempt");
const User = require("../models/User");

const router = express.Router();

/**
 * GET /api/leaderboard
 *
 * Ranking:
 *  - solvedCount: number of unique problems solved (has at least one "correct" attempt)
 *  - totalAttempts: total attempts across all problems
 *  - sorted by solvedCount DESC, totalAttempts ASC
 *  - excludes admin users
 */
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "50", 10); // optional ?limit=10

    const leaderboardRaw = await Attempt.aggregate([
      // group by user + problem to get attempts per problem and whether solved
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
      // now group by user to get totals
      {
        $group: {
          _id: "$_id.userId",
          totalAttempts: { $sum: "$attemptsForProblem" },
          solvedCount: { $sum: "$hasCorrect" },
        },
      },
      // join with users collection to get name/email/isAdmin
      {
        $lookup: {
          from: "users", // collection name in Mongo
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      // exclude admins from leaderboard
      {
        $match: {
          "user.isAdmin": { $ne: true },
        },
      },
      // sort by solved DESC, attempts ASC, then by name/email for stable order
      {
        $sort: {
          solvedCount: -1,
          totalAttempts: 1,
          "user.name": 1,
        },
      },
      // optionally limit number of rows
      { $limit: limit },
      // project final shape
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

    // add rank number (1-based)
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
