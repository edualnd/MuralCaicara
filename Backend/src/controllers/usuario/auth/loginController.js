import dayjs from 'dayjs';
import { checarCredenciarLogin } from '../../../model/usuarioModel.js';
import { comparar } from '../../../utils/security/bcrypt/bcryptUtils.js';
import {
  criarSessao,
  deletarSessao,
} from '../../../utils/security/session/session.js';
import {
  gerarAccessToken,
  gerarRefreshToken,
} from '../../../utils/security/jwt/token.js';
import CustomError from '../../../errors/CustomErrors.js';

const loginController = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    const user = await checarCredenciarLogin(email);
    if (!user) {
      throw new CustomError(401, `Erro, email ou senha incorreto`);
    }

    const ehValidaSenha = await comparar(senha, user.senha);

    if (!ehValidaSenha) {
      throw new CustomError(401, `Erro, email ou senha incorreto`);
    }

    const deviceId = req.cookies?.deviceId;
    await deletarSessao(deviceId);

    const accessToken = gerarAccessToken(deviceId, user.userId);
    const sessionId = crypto.randomUUID();
    const refreshToken = gerarRefreshToken(deviceId, user.userId, sessionId);

    const expiredAt = dayjs()
      .add(process.env.RT_EXPIRE_INT, process.env.RT_EXPIRE_TIME)
      .toDate();

    const sessionData = {
      userId: user.userId,
      deviceId: deviceId,
      sessionId,
      expiredAt,
    };

    const session = await criarSessao(sessionData);
    if (!session) {
      throw new Error();
    }

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      expires: expiredAt,
      path: '/refresh',
    });
    res.cookie('id', user.userId, {
      httpOnly: true,
      sameSite: 'strict',
      expires: expiredAt,
      path: '/auth',
    });
    const { senha: psw, ...loggedUser } = user;
    return res.status(200).json({
      success: true,
      message: 'Logado',
      user: loggedUser,
      accessToken,
    });
  } catch (e) {
    next(e);
  }
};

export default loginController;
