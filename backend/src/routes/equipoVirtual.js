import miEquipoVirtual from "../controllers/equipoVirtualController.js";
import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();
router.get('/', verifyToken, miEquipoVirtual);

export default router;


//Routes conecta la URL con el controller. 
// Controller conecta con la BD a traves de pool .
    