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

router.patch('/editar', upload.single('avatar'), editarUsuarioController);

router.patch('/mudar-senha', senhaController);

router.post('/send-email-otp', autheticateMiddleware, emailOtpController);
router.patch('/mudar-email', verificarOTPMiddleware, emailController);

router.get('/logout', logoutController);

router.delete('/deletar', autheticateMiddleware, deletarUsuarioController);

router.get('/', perfilController);

export default router;
