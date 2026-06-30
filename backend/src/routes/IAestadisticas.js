import obtenerEstadisticas from "../controllers/iaController.js";
import { Router } from "express";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = Router();
router.post('/', verifyToken, verifyAdmin, obtenerEstadisticas); 

export default router; 