import CustomError from '../../../errors/CustomErrors.js';
import {
 checarCredenciarCadastro, registrarUsuario} from '../../../model/usuarioModel.js';
import { usuarioSchema } from '../../../schemas/usuarioSchema.js';
import { hashSenha } from '../../../utils/security/bcrypt/bcryptUtils.js';

import validadorSchema from '../../../utils/validators/schemaValidator.js';

const registrarController = async (req, res, next) => {
  try {
    const user = req.body;
    const { success, data } = await validadorSchema(usuarioSchema, user);
    if (!success) {
      throw new CustomError(
        400,
        'Dados inválidos: verifique e tente novamente',
      );
    }
    const credentialsAlreadyRegistered = await checarCredenciarCadastro(
      user.email,
      user.username,
    );
    if (credentialsAlreadyRegistered) {
      throw new CustomError(409, 'Username ou Email já cadastrado');
    }
    data.password = await hashSenha(data.password);
    const newUser = await registrarUsuario(data);
    if (!newUser) {
      throw new Error();
    }
    return res.status(201).json({
      success: true,
      message: 'Usuario criado com sucesso',
    });
  } catch (e) {
    next(e);
  }
};
export default registrarController;
