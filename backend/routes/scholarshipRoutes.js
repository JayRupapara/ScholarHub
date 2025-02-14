import express from "express";
import { advancedSearch } from "../controllers/advancedSearch.js";

const router = express.Router();

// Advanced Search Route
router.get("/advanced-search", advancedSearch);

export default router;
