import { mudarSenha, checarCredenciarLogin } from '../../model/usuarioModel.js';
import {
  comparar,
  hashSenha,
} from '../../utils/security/bcrypt/bcryptUtils.js';
import CustomError from '../../errors/CustomErrors.js';
const senhaController = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { email, userId } = req.user;
    const user = await checarCredenciarLogin(email);

    const isValidPassword = await comparar(oldPassword, user.password);
    if (!isValidPassword) {
      throw new CustomError(401, 'Senha invalida');
    }
    const newPasswordHash = await hashSenha(newPassword);
    const userChanged = await mudarSenha(userId, newPasswordHash);

    if (!userChanged) {
      throw new Error();
    }
    return res.status(200).json({
      success: true,
      message: 'Senha atualiza com sucesso',
    });
  } catch (e) {
    next(e);
  }
};

export default senhaController;
