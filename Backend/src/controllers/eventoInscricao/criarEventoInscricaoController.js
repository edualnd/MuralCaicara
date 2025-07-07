import CustomError from '../../errors/CustomErrors.js';
import {
  checarInscricao,
  seInscrever,
} from '../../model/eventInscricaoModel.js';

const criarEventoInscricaoController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { publicationId } = req.params;
    const isSub = await checarInscricao(userId, +publicationId);
    if (isSub) {
      throw new CustomError(400, 'Já inscrito');
    }
    const subs = await seInscrever(userId, +publicationId);
    if (!subs) {
      throw new Error();
    }

    return res.status(200).json({
      success: true,
      message: 'inscrição feita',
      subs,
    });
  } catch (e) {
    next(e);
  }
};

export default criarEventoInscricaoController;
