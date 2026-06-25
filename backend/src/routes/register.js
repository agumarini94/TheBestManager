import { register } from "../controllers/authController.js";
import { Router } from "express";

const router = Router();
router.post('/', register);

export default router; 
