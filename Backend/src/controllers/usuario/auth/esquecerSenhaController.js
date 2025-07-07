import { checarCredenciarLogin } from '../../../model/usuarioModel.js';
import { enviarEmail } from '../../../utils/security/Email/config.js';
import { templeteEsqueceuSenhaEmail } from '../../../utils/security/Email/emailTemplates.js';
import { gerarForgotPassWordToken } from '../../../utils/security/jwt/token.js';
import CustomError from '../../../errors/CustomErrors.js';
const esquecerSenhaController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await checarCredenciarLogin(email);

    if (!user) {
      throw new CustomError(
        400,
        'Dados inválidos: verifique e tente novamente',
      );
    }
    const token = gerarForgotPassWordToken(user.userId, email);
    const emailContent = templeteEsqueceuSenhaEmail(user.username, token);
    const emailData = {
      to: email,
      ...emailContent,
    };
    const emailSent = await enviarEmail(emailData);
    if (!emailSent) {
      throw new Error();
    }
    return res.status(200).json({
      success: true,
      message: 'Um email foi enviado, verifique sua caixa de entrada',
    });
  } catch (e) {
    next(e);
  }
};
export default esquecerSenhaController;
