const express = require("express");
const { auth } = require("../middleware/auth");
const Attempt = require("../models/Attempt");
const Problem = require("../models/Problem");

const router = express.Router();

// POST /api/attempts/:problemId  (submit flag)
router.post("/:problemId", auth, async (req, res) => {
  try {
    const { answers } = req.body;

    const problem = await Problem.findById(req.params.problemId);
    if (!problem) return res.status(404).json({ message: "Problem not found" });
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

    // Normalize answers to an array
    let answersArray = answers;
    if (!Array.isArray(answersArray)) {
      answersArray = [String(answers)];
    }

    //Check correctness
    const isCorrect = answersArray.includes(problem.flagAnswer);

    // Create new attempt
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
router.get("/mine/:problemId", auth, async (req, res) => {
  try {
    const { problemId } = req.params;

    const attempts = await Attempt.find({
      userId: req.user.id,
      problemId: problemId,
    }).sort({ createdAt: -1 });

    return res.json(attempts);
  } catch (err) {
    console.error("Error fetching user attempts:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
