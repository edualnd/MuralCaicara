import express from 'express';


import refreshTokenController from '../controllers/auth/refreshTokenController.js';
import registrarController from '../controllers/usuario/auth/registrarController.js';

import getEventoController from '../controllers/evento/getEventoController.js';

import loginController from '../controllers/usuario/auth/loginController.js';

const router = express.Router();

router.post('/refresh', refreshTokenController);

router.post('/registrar', registrarController);

router.post('/login', loginController);

router.get('/list', getEventoController);



export default router;
