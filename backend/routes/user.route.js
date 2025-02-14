import { signup, login, addDetails } from "../controllers/user.controller.js"; // ✅ Named imports
import authenticateToken from "../middleware/authenticateToken.js";
import { check } from "express-validator";
import express from "express";
import { uploadDocument } from "../controllers/user.js";
import multer from "multer";
const upload = multer();

// import { uploadDocument } from "../controllers/user.js";

const router = express.Router();

// Route to handle file upload
router.post("/adddoc", upload.single("file"), uploadDocument);
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

router.post("/addDetails", [authenticateToken], addDetails);

export default router;
