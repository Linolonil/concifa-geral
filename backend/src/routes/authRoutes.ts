import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { validarRegistro, validarLogin } from '../utils/validators.js';

const router = Router();
const authController = new AuthController();

router.post('/register', validarRegistro, authController.registrar);
router.post('/login', validarLogin, authController.login);

export const authRoutes = router; 