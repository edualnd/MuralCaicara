import express from 'express';
import getAvaliacaoMediaController from '../controllers/avaliacao/getAvaliacaoMediaController.js';
import criarAvaliacaoController from '../controllers/avaliacao/criarAvaliacaoController.js';
import atualizarAvaliacaoController from '../controllers/avaliacao/atualizarAvaliacaoController.js';
import deletarAvaliacaoController from '../controllers/avaliacao/deletarAvaliacaoController.js';

const router = express.Router();

router.get('/:publicationId', getAvaliacaoMediaController);
router.post('/:publicationId', criarAvaliacaoController);
router.put('/:publicationId', atualizarAvaliacaoController);
router.delete('/:publicationId', deletarAvaliacaoController);
export default router;
