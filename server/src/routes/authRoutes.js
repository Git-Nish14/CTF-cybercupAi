const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { auth } = require("../middleware/auth");
const { OAuth2Client } = require("google-auth-library");

const router = express.Router();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function setTokenCookie(res, user) {
  const token = jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie(process.env.COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // set true in production with HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

// REGISTER (local)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
      authProvider: "local",
    });

    setTokenCookie(res, user);

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN (local email/password)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // prevent password login for Google-only accounts
    if (!user.passwordHash || user.authProvider === "google") {
      return res
        .status(400)
        .json({ message: "Please log in with Google for this account" });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    setTokenCookie(res, user);

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GOOGLE LOGIN
router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body; // ID token from frontend

    if (!credential) {
      return res.status(400).json({ message: "Missing Google credential" });
    }

    // Verify with Google
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name;
    const picture = payload.picture;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Google account does not have an email" });
    }

    // Find or create user by email
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture,
        authProvider: "google",
        passwordHash: null, // no local password
      });
    } else {
      // If an existing local user logs in with Google, you can link them
      if (!user.googleId) {
        user.googleId = googleId;
      }
      if (!user.authProvider) {
        user.authProvider = "google";
      }
      if (!user.avatar && picture) {
        user.avatar = picture;
      }
      await user.save();
    }

    // Issue your normal JWT cookie
    setTokenCookie(res, user);

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Google authentication failed" });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.json({ message: "Logged out" });
});

// GET /api/auth/me
router.get("/me", auth, (req, res) => {
  return res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
});

module.exports = router;
