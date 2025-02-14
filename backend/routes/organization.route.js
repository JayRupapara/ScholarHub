// import organizationSchema from "../models/organization.model.js";
import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import {
  addScholarship,
  updateScholarship,
  showAllScholarships,
} from "../controllers/scholarship.controller.js";

const router = express.Router();

router.route("/add").post(authenticateToken, addScholarship);
router.route("/update").post(authenticateToken, updateScholarship);
router.route("/showAll").post(authenticateToken, showAllScholarships);

export default router;
