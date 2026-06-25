import { login } from "../controllers/authController.js"; //uso { login } xq en Controllers exporte 2 archivos, y se usa con { para dos o mas archivos }. entonces para importar es igual.
import { Router } from "express";

const router = Router();
router.post('/', login);

export default router; 
