import {
  mudaremail,
  checarCredenciarCadastro,
} from '../../../model/usuarioModel.js';
import validadorSchema from '../../../utils/validators/schemaValidator.js';
import { usuarioSchema } from '../../../schemas/usuarioSchema.js';
import CustomError from '../../../errors/CustomErrors.js';
const emailController = async (req, res, next) => {
  try {
    const { newEmail } = req.body;
    const { userId } = req.user;

    const { success, error, data } = await validadorSchema(
      usuarioSchema,
      { email: newEmail },
      { username: true, password: true },
    );
    if (!success) {
      throw new CustomError(
        400,
        'Dados inválidos: verifique e tente novamente',
      );
    }
    const chagedUser = await mudaremail(userId, newEmail);

    return res.status(200).json({
      success: true,
      message: `Email alterado com sucesso`,
      chagedUser,
    });
  } catch (e) {
    next(e);
  }
};
export default emailController;
