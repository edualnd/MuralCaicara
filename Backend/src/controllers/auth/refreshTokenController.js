import dayjs from 'dayjs';
import {
  criarSessao,
  deletarSessoesExpiradas,
  deletarSessao,
  encontrarSessao,
} from '../../utils/security/session/session.js';
import {
  decodeToken,
  gerarAccessToken,
  gerarRefreshToken,
  validarRefreshToken,
} from '../../utils/security/jwt/token.js';
import CustomError from '../../errors/CustomErrors.js';

const refreshTokenController = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const { deviceId, userId } = decodeToken(refreshToken);
    if (deviceId != req.cookies?.deviceId) {
      await deletarSessao(req.cookies?.deviceId);
      res.clearCookie('refreshToken', {
        path: '/refresh',
      });
      res.clearCookie('id', {
        path: '/auth',
      });
      console.log('1 ');
      throw new CustomError(401, 'Faça login');
    }

    const { success } = validarRefreshToken(refreshToken);
    if (!success) {
      console.log('2 ');
      await deletarSessao(deviceId);
      res.clearCookie('refreshToken', {
        path: '/refresh',
      });
      res.clearCookie('id', {
        path: '/auth',
      });
      throw new CustomError(401, 'Faça login');
    }

    const session = await encontrarSessao(deviceId);
    if (!session) {
      console.log('3 ');
      await deletarSessoesExpiradas(deviceId);
      res.clearCookie('refreshToken', {
        path: '/refresh',
      });
      res.clearCookie('id', {
        path: '/auth',
      });
      throw new CustomError(401, 'Faça login');
    }

    await deletarSessao(deviceId);

    const newAccessToken = gerarAccessToken(deviceId, userId);

    const sessionId = crypto.randomUUID();

    const newRefreshToken = gerarRefreshToken(deviceId, userId, sessionId);

    const expiredAt = dayjs()
      .add(process.env.RT_EXPIRE_INT, process.env.RT_EXPIRE_TIME)
      .toDate();

    const sessionData = {
      userId,
      deviceId,
      sessionId,
      expiredAt,
    };

    const newSession = await criarSessao(sessionData);
    if (!newSession) {
      throw new Error();
    }
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      expires: expiredAt,
      path: '/refresh',
    });
    res.cookie('id', userId, {
      httpOnly: true,
      sameSite: 'strict',
      expires: expiredAt,
      path: '/auth',
    });
    return res.status(200).json({
      success: true,
      message: 'Novo access token criado',
      accessToken: newAccessToken,
    });
  } catch (e) {
    next(e);
  }
};

export default refreshTokenController;
