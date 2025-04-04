const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

// Register a new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email is already taken
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Local login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: "Logged in successfully", user });
    });
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: "Logged out successfully" });
  });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
);

router.get(
  "/apple",
  passport.authenticate("apple", {
    scope: ["email"],
  })
);

router.get(
  "/apple/callback",
  passport.authenticate("apple", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
);

module.exports = router;
