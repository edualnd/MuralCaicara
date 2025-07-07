import express from 'express';

import perfilController from '../controllers/usuario/perfilController.js';
import refreshTokenController from '../controllers/auth/refreshTokenController.js';
import registrarController from '../controllers/usuario/auth/registrarController.js';
import esquecerSenhaController from '../controllers/usuario/auth/esquecerSenhaController.js';
import checarTokenEsquecerSenhaTokenMiddleware from '../middlewares/checarTokenEsquecerSenhaTokenMiddleware.js';
import resetarSenhaController from '../controllers/usuario/auth/resetarSenhaController.js';
import getEventoController from '../controllers/evento/getEventoController.js';
import getAvaliacaoMediaController from '../controllers/avaliacao/getAvaliacaoMediaController.js';
import loginController from '../controllers/usuario/auth/loginController.js';

const router = express.Router();

router.post('/refresh', refreshTokenController);

router.post('/registrar', registrarController);

router.post('/login', loginController);

router.get('/perfil/:username', perfilController);

router.post('/esquecer-senha', esquecerSenhaController);
router.post(
  '/resetar-senha/:token',
  checarTokenEsquecerSenhaTokenMiddleware,
  resetarSenhaController,
);
router.get('/', (req, res, next) => {
  return res.status(200).json({ success: true });
});

router.get('/list', getEventoController);

router.get('/ratings/:publicationId', getAvaliacaoMediaController);

export default router;
