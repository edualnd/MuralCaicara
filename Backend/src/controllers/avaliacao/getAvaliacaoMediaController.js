import { getMediaAvaliacao } from '../../model/avaliacaoModel.js';

export default async function getAvaliacaoMediaController(req, res, next) {
  try {
    const { publicationId } = req.params;

    if (!publicationId) {
      return res.status(400).json({ error: 'ID da publicação é obrigatório' });
    }

    const result = await getMediaAvaliacao(+publicationId);

    return res
      .status(200)
      .json({ success: true, message: 'Media encontrada', rating: result });
  } catch (error) {
    return res.status(500).json({
      error: 'Erro interno no servidor',
      details: error.message,
      publicationId: req.params.publicationId,
    });
  }
}
