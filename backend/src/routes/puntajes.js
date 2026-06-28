import crearPuntajes from "../controllers/puntajesController.js";
import { Router } from "express";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = Router();
router.post('/', verifyToken, verifyAdmin, crearPuntajes); //es un post , xq estoy haciendo un ingreso de info.. 


export default router;


//Routes conecta la URL con el controller. 
// Controller conecta con la BD a traves de pool .
