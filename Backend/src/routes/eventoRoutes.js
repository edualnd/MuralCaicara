import express from 'express';

import getEventoController from '../controllers/evento/getEventoController.js';

import criarEventoController from '../controllers/evento/criarEventoController.js';
import deletarEventoController from '../controllers/evento/deletarEventoController.js';
import atualizarEventoController from '../controllers/evento/atualizarEventoController.js';
import upload from '../utils/multer/config.js';

const router = express.Router();

router.get('/listar', getEventoController);

router.post('/', upload.array('photos', 2), criarEventoController);
router.put(
  '/:publicationId',
  upload.array('photos', 2),
  atualizarEventoController,
);
router.delete('/:publicationId', deletarEventoController);
export default router;
