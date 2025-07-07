import { deletarConta } from '../../model/usuarioModel.js';

const deletarUsuarioController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const deletardUser = await deletarConta(userId);
    if (!deletardUser) {
      throw new Error();
    }
    res.clearCookie('refreshToken', {
      path: '/refresh',
    });
    res.clearCookie('id', {
      path: '/auth',
    });
    return res.status(200).json({
      success: true,
      message: 'Conta deletada',
    });
  } catch (e) {
    next(e);
  }
};

export default deletarUsuarioController;
