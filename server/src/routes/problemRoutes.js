const express = require("express");
const Problem = require("../models/Problem");
const { auth, adminOnly } = require("../middleware/auth");

const router = express.Router();

// PUBLIC: list all problems
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    res.json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUBLIC: get single problem
router.get("/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Not found" });
    res.json(problem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ADMIN: create problem
router.post("/", auth, adminOnly, async (req, res) => {
  try {
    const { title, description, flagAnswer, difficulty } = req.body;

    const problem = await Problem.create({
      title,
      description,
      flagAnswer,
      difficulty,
      createdBy: req.user.id,
    });

    res.status(201).json(problem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ADMIN: update problem
router.put("/:id", auth, adminOnly, async (req, res) => {
  try {
    const { title, description, flagAnswer, difficulty } = req.body;

    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { title, description, flagAnswer, difficulty },
      { new: true }
    );

    if (!problem) return res.status(404).json({ message: "Not found" });

    res.json(problem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ADMIN: delete problem
router.delete("/:id", auth, adminOnly, async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    if (!problem) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Problem deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
