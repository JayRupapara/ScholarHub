import express from "express";
import { advancedSearch } from "../controllers/advancedSearch.js";
import {addScholarship, updateScholarship, showAllScholarships, deleteScholarship} from "../controllers/scholarship.controller.js";

const router = express.Router();

// Advanced Search Route
router.get("/advanced-search", advancedSearch);
router.post("/addScholarship", addScholarship);
router.put("/updateScholarship", updateScholarship);
router.delete("/deleteScholarship", deleteScholarship);
router.get("/showAllScholarship", showAllScholarships);

export default router;
