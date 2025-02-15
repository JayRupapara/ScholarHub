import express from 'express';
import { signup, login, getOrganizationDetails, getScholarship, addsScholarship, getScholarshipDashboard, getAppliedScholarship } from '../controllers/organization.controller.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

import {
    addScholarship,
    updateScholarship,
    showAllScholarships,
} from "../controllers/scholarship.controller.js";

router.route("/add").post(authenticateToken, addScholarship);
router.route("/update").post(authenticateToken, updateScholarship);
router.route("/showAll").post(authenticateToken, showAllScholarships);


router.post('/signup', signup);

router.post('/login', login);
router.get("/getScholarships", [authenticateToken], getScholarship);
router.get("/getOrg", [authenticateToken], getOrganizationDetails);
router.post("/addScholarship", authenticateToken, addsScholarship);
router.get("/getDashboard", authenticateToken, getScholarshipDashboard);
router.get("/getAppliedScholarship", authenticateToken, getAppliedScholarship)
export default router;
