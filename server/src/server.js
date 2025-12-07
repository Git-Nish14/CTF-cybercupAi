// src/server.js
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");
const attemptRoutes = require("./routes/attemptRoutes");
const userRoutes = require("./routes/userRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();

// connect to MongoDB
connectDB();

// middlewares
app.use(
  cors({
    origin: "http://localhost:3000", // your React/Next frontend
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/stats", statsRoutes);

// health check
app.get("/", (req, res) => {
  res.send("CTF backend API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
