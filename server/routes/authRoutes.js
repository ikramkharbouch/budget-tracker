const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const {loginSchema, registerSchema} = require('../validation/authValidator');
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already registered
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Initiate Google OAuth
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Google OAuth

 * /api/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects after login
 */

/**
 * @swagger
 * /api/auth/apple:
 *   get:
 *     summary: Initiate Apple OAuth
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Apple OAuth

 * /api/auth/apple/callback:
 *   get:
 *     summary: Apple OAuth callback
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects after login
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user info
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved
 *       401:
 *         description: Not authenticated
 */

// Register
router.post("/register", async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { username, email, password } = validatedData;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = generateToken(user);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: err.errors });
    }
    console.error("Register error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info.message });

      req.logIn(user, (err) => {
        if (err) return next(err);

        const token = generateToken(user);

        return res.status(200).json({
          message: "Logged in successfully",
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
          token,
        });
      });
    })(req, res, next);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: err.errors });
    }
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: "Logged out successfully" });
  });
});

router.get("/me", async (req, res) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.userId, {
      attributes: ["id", "username", "email", "createdAt"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Server error" });
  }
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
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const token = generateToken(req.user);

    res.redirect(`/?token=${token}`);
  }
);

router.get(
  "/apple",
  passport.authenticate("apple", {
    scope: ["email"],
  })
);

router.get(
  "/apple/callback",
  passport.authenticate("apple", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    const token = generateToken(req.user);

    res.redirect(`/?token=${token}`);
  }
);

module.exports = router;
