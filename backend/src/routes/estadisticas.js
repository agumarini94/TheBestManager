import { crearEstadisticas, getMisEstadisticas } from "../controllers/estadisticasController.js";
import { Router } from "express";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = Router(); 

router.post('/',verifyToken, verifyAdmin, crearEstadisticas )

router.get('/', verifyToken, getMisEstadisticas)

export default router; 
