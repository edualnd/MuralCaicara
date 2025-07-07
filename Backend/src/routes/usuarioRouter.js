import express from 'express';
import editarUsuarioController from '../controllers/usuario/editarUsuarioController.js';
import senhaController from '../controllers/usuario/senhaController.js';
import emailController from '../controllers/usuario/MudarEmail/emailController.js';
import emailOtpController from '../controllers/usuario/MudarEmail/emailOtpController.js';
import autheticateMiddleware from '../middlewares/autheticateMiddleware.js';
import verificarOTPMiddleware from '../middlewares/verificarOTPMiddleware.js';
import logoutController from '../controllers/usuario/auth/logoutController.js';
import deletarUsuarioController from '../controllers/usuario/deletarUsuarioController.js';
import perfilController from '../controllers/usuario/perfilController.js';
import upload from '../utils/multer/config.js';

const router = express.Router();

router.patch('/editar', upload.single('foto'), editarUsuarioController);


router.get('/logout', logoutController);

router.delete('/deletar', autheticateMiddleware, deletarUsuarioController);

router.get('/', perfilController);

export default router;
