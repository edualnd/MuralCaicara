import { checarCredenciarLogin } from '../model/usuarioModel.js';
import { comparar } from '../utils/security/bcrypt/bcryptUtils.js';
import CustomError from '../errors/CustomErrors.js';
const autheticateMiddleware = async (req, res, next) => {
  try {
    const senha = req.body.senha;
    const email = req.user.email;
    const usuario = await checarCredenciarLogin(email);

    const ehValidaSenha = await comparar(senha, usuario.senha);
    if (!ehValidaSenha) {
      throw new CustomError(401, 'Senha inválida');
    }
    next();
  } catch (e) {
    next(e);
  }
};

export default autheticateMiddleware;
