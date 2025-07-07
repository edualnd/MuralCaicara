import { getDadosUsuario } from '../model/usuarioModel.js';
import { validarAccessToken } from '../utils/security/jwt/token.js';
import CustomError from '../errors/CustomErrors.js';
const checarAccessTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const { success, data, error } = validarAccessToken(token);
    const id = req.cookies?.id;
    if (!success || (data.sub || null) != id) {
      throw new CustomError(401, 'Token invalido');
    }
    const user = await getDadosUsuario(data.sub);
    req.user = { ...user, deviceId: data.deviceId };
    next();
  } catch (e) {
    next(e);
  }
};

export default checarAccessTokenMiddleware;
