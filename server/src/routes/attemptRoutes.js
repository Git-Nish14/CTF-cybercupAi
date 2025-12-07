// src/routes/attemptRoutes.js
const express = require("express");
const { auth } = require("../middleware/auth");
const Attempt = require("../models/Attempt");
const Problem = require("../models/Problem");

const router = express.Router();

// POST /api/attempts/:problemId  (submit flag)
router.post("/:problemId", auth, async (req, res) => {
  try {
    const { answers } = req.body; // array of strings OR a single string

    const problem = await Problem.findById(req.params.problemId);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    // 🚫 1. Check if user already solved this problem
    const alreadySolved = await Attempt.findOne({
      userId: req.user.id,
      problemId: problem._id,
      result: "correct",
    });

    if (alreadySolved) {
      return res.status(400).json({
        message:
          "You have already solved this problem. No more attempts allowed.",
      });
    }

    // 2. Normalize answers to an array
    let answersArray = answers;
    if (!Array.isArray(answersArray)) {
      answersArray = [String(answers)];
    }

    // 3. Check correctness
    const isCorrect = answersArray.includes(problem.flagAnswer);

    // 4. Create new attempt
    const attempt = await Attempt.create({
      userId: req.user.id,
      problemId: problem._id,
      answers: answersArray,
      result: isCorrect ? "correct" : "incorrect",
    });

    res.status(201).json(attempt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/attempts/:problemId  (all attempts of current user for this problem)
router.get("/:problemId", auth, async (req, res) => {
  try {
    const attempts = await Attempt.find({
      userId: req.user.id,
      problemId: req.params.problemId,
    }).sort({ createdAt: -1 });

    res.json(attempts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/attempts/mine/:problemId
// Returns all attempts of the logged-in user for a specific problem
router.get("/mine/:problemId", auth, async (req, res) => {
  try {
    const { problemId } = req.params;

    const attempts = await Attempt.find({
      userId: req.user.id, // from auth middleware
      problemId: problemId,
    }).sort({ createdAt: -1 }); // latest first (change to 1 for oldest first)

    return res.json(attempts);
  } catch (err) {
    console.error("Error fetching user attempts:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
