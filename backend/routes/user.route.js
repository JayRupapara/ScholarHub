import { signup, login, addDetails,getProfileDetails } from "../controllers/user.controller.js"; // ✅ Named imports
import authenticateToken from "../middleware/authenticateToken.js";
import { check } from "express-validator";
import express from "express";
import { uploadDocument } from "../controllers/user.controller.js";
import multer from "multer";
const upload = multer();

const router = express.Router();

// Route to handle file upload
router.post("/addDoc/:type", [upload.single("file"), authenticateToken], uploadDocument);

// Signup route
router.post(
  "/signup",
  [
    check("fullName", "Full name is required").not().isEmpty(),
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

router.post(
  "/addDetails",
  [
    authenticateToken
  ],
  addDetails
);

router.get(
  "/getProfile", 
  [
    authenticateToken
  ],
  getProfileDetails)

export default router;
