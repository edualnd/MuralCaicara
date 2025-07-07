import { getInscricoes } from '../../model/eventInscricaoModel.js';

const getEventoInscricaoController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const subs = await getInscricoes(userId);
    if (!subs) {
      throw new Error();
    }

    return res.status(200).json({
      success: true,
      message: 'inscrições coletadas',
      subs,
    });
  } catch (e) {
    next(e);
  }
};

export default getEventoInscricaoController;
