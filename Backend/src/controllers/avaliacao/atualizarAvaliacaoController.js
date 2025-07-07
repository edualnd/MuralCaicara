import { atualizarAvaliacao } from '../../model/avaliacaoModel.js';
import validadorSchema from '../../utils/validators/schemaValidator.js';
import avaliacaoSchema from '../../schemas/avaliacaoSchema.js';

export default async function atualizarAvaliacaoController(req, res, next) {
  try {
    const authorId = req.user.userId;
    const { publicationId } = req.params;
    const { rating } = req.body;

    const { success, error, data } = await validadorSchema(avaliacaoSchema, {
      rating,
    });

    if (!success) {
      console.log(error);
      return res.status(500).json({ error: error });
    }

    const result = await atualizarAvaliacao(rating, authorId, +publicationId);
    console.log(result);
    return res.status(200).json({
      success: true,
      message: 'Avaliação atualizada com sucesso!',
      rating: result,
    });
  } catch (error) {
    console.error('Erro ao atualizar avaliação:', error);
    return res.status(500).json({ error: 'Erro ao atualizar avaliação' });
  }
}
