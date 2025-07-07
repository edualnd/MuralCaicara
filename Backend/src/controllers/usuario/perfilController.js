import { encontrarUsuarioPorNome } from '../../model/usuarioModel.js';
import CustomError from '../../errors/CustomErrors.js';
const perfilController = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await encontrarUsuarioPorNome(username);

    if (!user) {
      throw new CustomError(404, 'Não encontrado');
    }
    return res.status(200).json({
      success: true,
      message: 'Perfil encontrado',
      user,
    });
  } catch (e) {
    next(e);
  }
};

export default perfilController;
