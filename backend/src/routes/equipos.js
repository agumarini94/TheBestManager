import getEquipo from "../controllers/equiposController.js";
import { Router } from "express";

const router = Router(); 

router.get('/', getEquipo )


export default router; 
