import getJugador from "../controllers/jugadoresController.js";
import { Router } from "express";

const router = Router(); 
router.get('/', getJugador);

export default router; 
