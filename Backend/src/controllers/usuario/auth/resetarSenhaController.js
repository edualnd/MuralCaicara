import { mudarSenha } from '../../../model/usuarioModel.js';
import { hashSenha } from '../../../utils/security/bcrypt/bcryptUtils.js';

const resetarSenhaController = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const userId = req.user.userId;

    const passwordHash = await hashSenha(newPassword);
    const changeUser = await mudarSenha(userId, passwordHash);

    if (!changeUser) {
      throw new Error();
    }
    return res.status(200).json({
      success: true,
      message: 'Senha trocada',
    });
  } catch (e) {
    next(e);
  }
};
export default resetarSenhaController;
