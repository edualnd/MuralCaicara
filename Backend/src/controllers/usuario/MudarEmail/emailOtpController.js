import { checarCredenciarCadastro } from '../../../model/usuarioModel.js';
import validadorSchema from '../../../utils/validators/schemaValidator.js';
import { usuarioSchema } from '../../../schemas/usuarioSchema.js';
import { criarSecret, gerarOTP } from '../../../utils/security/otplib/otp.js';
import { enviarEmail } from '../../../utils/security/Email/config.js';
import { templeteMudarEmail } from '../../../utils/security/Email/emailTemplates.js';

import CustomError from '../../../errors/CustomErrors.js';
const emailOtpController = async (req, res, next) => {
  try {
    const { newEmail } = req.body;
    const { email, userId, username } = req.user;

    const { success } = await validadorSchema(
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
    const checkEmail = await checarCredenciarCadastro(newEmail, '');
    if (checkEmail) {
      throw new CustomError(409, 'Email já cadastrado');
    }

    const secret = criarSecret(`${email}-${newEmail}`, userId);
    const otp = gerarOTP(secret);
    const emailContent = templeteMudarEmail(username, otp);
    const emailData = {
      to: `${username} ${newEmail}`,
      ...emailContent,
    };
    const emailSent = await enviarEmail(emailData);
    if (!emailSent) {
      throw new CustomError(
        400,
        'Dados inválidos: verifique e tente novamente',
      );
    }
    return res.status(200).json({
      success: true,
      message: `Um email foi enviado para ${newEmail}, para continuar acesse o link gerado`,
    });
  } catch (e) {
    next(e);
  }
};
export default emailOtpController;
