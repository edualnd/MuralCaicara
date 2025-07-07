import {
  editarPerfil,
  perfilAtual,
  checarCredenciarCadastro,
} from '../../model/usuarioModel.js';
import { profileSchema, usuarioSchema } from '../../schemas/usuarioSchema.js';
import { deletarDoCloud, uploadCloud } from '../../utils/cloudinary/config.js';
import validadorSchema from '../../utils/validators/schemaValidator.js';
import CustomError from '../../errors/CustomErrors.js';
const editarUsuarioController = async (req, res, next) => {
  try {
    const { userId, username } = req.user;
    const currentProfile = await perfilAtual(userId);
    const { bio, deletarPhoto, newUsername } = req.body;

    const {
      success: ValidadeSuccess,
      error,
      data,
    } = await validadorSchema(
      usuarioSchema,
      { username: newUsername },
      { email: true, password: true },
    );
    if (!ValidadeSuccess) {
      throw new CustomError(
        400,
        'Dados inválidos: verifique e tente novamente',
      );
    }
    if (username != newUsername) {
      const checkUsername = await checkRegisteredCredentials('', newUsername);
      if (checkUsername) {
        throw new CustomError(409, 'Username já em uso');
      }
    }

    const newBio = bio ? bio : currentProfile.bio;

    let imageUrl = currentProfile.userImage;

    if (req.file) {
      const cloudData = await uploadCloud(req.file.path);
      if (!cloudData) {
        return res.status(400).json({
          message: 'Erro ao salvar imagem',
        });
      }
      imageUrl = cloudData.public_id + '.' + cloudData.format;

      if (currentProfile.userImage != null) {
        const oldPhoto = currentProfile.userImage.split('.')[0];
        await deletarDoCloud(oldPhoto);
      }
    } else if (!req.file && deletarPhoto == 'true') {
      imageUrl = null;
    }

    const { success, error: errorI } = await validadorSchema(
      profileSchema,
      {
        bio: newBio || '',
      },
      { userImage: true },
    );
    console.log(errorI);
    if (!success) {
      throw new CustomError(
        400,
        'Dados inválidos: verifique e tente novamente',
      );
    }

    const editProfile = await editarPerfil(userId, {
      bio: newBio,
      userImage: imageUrl,
      username: newUsername,
    });

    if (!editProfile) {
      throw new Error();
    }

    return res.status(200).json({
      success: true,
      message: 'Perfil atualizado com sucesso',
      editProfile,
    });
  } catch (e) {
    next(e);
  }
};

export default editarUsuarioController;
