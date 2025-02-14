import express from 'express';
import { signup, login, getOrganizationDetails } from '../controllers/organization.controller.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.get("/getOrg", [authenticateToken], getOrganizationDetails);
export default router;
