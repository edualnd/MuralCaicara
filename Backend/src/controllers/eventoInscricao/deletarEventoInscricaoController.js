import CustomError from '../../errors/CustomErrors.js';
import {
  checarInscricao,
  desinscrever,
} from '../../model/eventInscricaoModel.js';

const deletarEventoInscricaoController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { publicationId } = req.params;
    const isSub = await checarInscricao(userId, +publicationId);
    if (!isSub) {
      throw new CustomError(400, 'Não inscrito');
    }
    const subs = await desinscrever(userId, +publicationId);
    if (!subs) {
      throw new Error();
    }

    return res.status(200).json({
      success: true,
      message: 'inscrição deletada',
      subs,
    });
  } catch (e) {
    next(e);
  }
};

export default deletarEventoInscricaoController;
