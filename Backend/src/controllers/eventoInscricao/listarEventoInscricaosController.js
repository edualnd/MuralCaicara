import { listarInscricoes } from '../../model/eventInscricaoModel.js';

const listarEventoInscricaosController = async (req, res, next) => {
  try {
    const { publicationId } = req.params;
    const subs = await listarInscricoes(+publicationId);
    if (!subs) {
      throw new Error();
    }

    return res.status(200).json({
      success: true,
      message: 'inscritos coletados',
      subs,
    });
  } catch (e) {
    next(e);
  }
};

export default listarEventoInscricaosController;
