// routes/aadhaar.routes.js
import express from "express";
import { verifyAadhaar } from "../controllers/aadharverify.controller.js";

const router = express.Router();

router.post("/verify-aadhaar", verifyAadhaar);

export default router;
