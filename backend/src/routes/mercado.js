import {comprarJugador, venderJugador} from "../controllers/mercadoController.js";
import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();
router.post('/', verifyToken, comprarJugador);
router.delete('/', verifyToken, venderJugador);

export default router; 

