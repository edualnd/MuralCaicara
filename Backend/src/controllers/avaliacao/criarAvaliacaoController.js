import { criarAvaliacao } from '../../model/avaliacaoModel.js';
import validadorSchema from '../../utils/validators/schemaValidator.js';
import avaliacaoSchema from '../../schemas/avaliacaoSchema.js';

export default async function criarAvaliacaoController(req, res, next) {
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

    const result = await criarAvaliacao(rating, authorId, +publicationId);

    return res.status(200).json({
      success: true,
      message: 'Avaliação registrada com sucesso!',
      rating: result,
    });
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error('Este usuário já avaliou este evento');
    }
    throw error;
  }
}
