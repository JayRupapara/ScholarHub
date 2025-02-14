import { signup, login } from "../controllers/user.controller.js"; // ✅ Named imports
import { check } from "express-validator";
import express from "express";

const router = express.Router();

// Signup route
router.post(
  "/signup",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
  ],
  signup
);

// Login route
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
  ],
  login
);

export default router;
