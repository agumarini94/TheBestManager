import { getPresupuesto } from "../controllers/authController.js";
import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();
router.get('/',verifyToken, getPresupuesto);

export default router;
