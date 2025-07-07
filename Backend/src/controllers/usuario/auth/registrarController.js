import CustomError from '../../../errors/CustomErrors.js';
import {
 checarCredenciarCadastro, registrarUsuario} from '../../../model/usuarioModel.js';
import { organizadorRoleSchema, usuarioSchema } from '../../../schemas/usuarioSchema.js';
import { hashSenha } from '../../../utils/security/bcrypt/bcryptUtils.js';

import validadorSchema from '../../../utils/validators/schemaValidator.js';

const registrarController = async (req, res, next) => {
  try {
    const user = req.body;
    let dados = null;
    if (user.role == "ORGANIZADOR"){
      const { success, data } = await validadorSchema(organizadorRoleSchema, user);
      if (!success) {
      throw new CustomError(
        400,
        'Dados inválidos: verifique e tente novamente',
      );
    }
    dados = {...data, role: 'ORGANIZADOR'};
    }else {
      const { success, data } = await validadorSchema(usuarioSchema, user); 
      if (!success) {
      throw new CustomError(
        400,
        'Dados inválidos: verifique e tente novamente',
      );
    }
    dados = data
    }

    
    const credentialsAlreadyRegistered = await checarCredenciarCadastro(
      user.email,
    );
    if (credentialsAlreadyRegistered) {
      throw new CustomError(409, 'Email já cadastrado');
    }

    dados.senha = await hashSenha(dados.senha);
    const newUser = await registrarUsuario(dados);
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
