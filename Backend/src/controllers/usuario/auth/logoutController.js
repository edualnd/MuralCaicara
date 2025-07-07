import { deletarSessao } from '../../../utils/security/session/session.js';

const logoutController = async (req, res, next) => {
  try {
    const { userId, deviceId } = req.user;

    await deletarSessao(deviceId);

    res.clearCookie('refreshToken', {
      path: '/refresh',
    });
    res.clearCookie('id', {
      path: '/auth',
    });
    return res.status(200).json({
      success: true,
      message: 'Logout com sucesso',
      userId,
      deviceId,
    });
  } catch (e) {
    next(e);
  }
};

export default logoutController;
