import { getPerfilUsuario } from '../../../model/usuarioModel.js';

const userProfileController = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const userProfile = await getPerfilUsuario(userId);
    if (!userProfile) {
      throw new Error();
    }
    return res.status(200).json({
      success: true,
      message: 'Sucesso',
      user: userProfile,
    });
  } catch (e) {
    next(e);
  }
};

export default userProfileController;
