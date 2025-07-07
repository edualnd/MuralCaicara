import express from 'express';
import getEventoInscricaoController from '../controllers/eventoInscricao/getEventoInscricaoController.js';
import listarEventoInscricaosController from '../controllers/eventoInscricao/listarEventoInscricaosController.js';
import criarEventoInscricaoController from '../controllers/eventoInscricao/criarEventoInscricaoController.js';
import deletarAvaliacaoController from '../controllers/avaliacao/deletarAvaliacaoController.js';

const router = express.Router();

router.get('/', getEventoInscricaoController);
router.get('/listar/:publicationId', listarEventoInscricaosController);
router.post('/:publicationId', criarEventoInscricaoController);
router.delete('/:publicationId', deletarAvaliacaoController);

export default router;
