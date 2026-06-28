import {crearPuntajes, getPuntajes} from "../controllers/puntajesController.js";
import { Router } from "express";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = Router();
router.post('/', verifyToken, verifyAdmin, crearPuntajes); //es un post , xq estoy haciendo un ingreso de info.. 
router.get('/', verifyToken, getPuntajes); //esto es un get , prestar atencion aca 

export default router;


//Routes conecta la URL con el controller. 
// Controller conecta con la BD a traves de pool .
