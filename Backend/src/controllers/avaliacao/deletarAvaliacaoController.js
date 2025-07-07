import { deletarAvaliacao } from '../../model/avaliacaoModel.js';

export default async function deletarAvaliacaoController(req, res, next) {
  try {
    const user = req.user.userId;
    const { publicationId } = req.params;

    const result = await deletarAvaliacao(user, +publicationId);

    return res.status(200).json({
      success: true,
      message: 'Avaliação deletada com sucesso!',
      deletardRating: result,
    });
  } catch (error) {
    console.log('Erro ao deletar avaliação:', error.message);
    return res.status(500).json({ error: error.message });
  }
}
