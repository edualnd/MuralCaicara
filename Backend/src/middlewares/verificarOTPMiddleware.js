import { criarSecret, verificarOTP } from '../utils/security/otplib/otp.js';
import CustomError from '../errors/CustomErrors.js';
const verificarOTPMiddleware = (req, res, next) => {
  try {
    const { tokenOTP, newEmail } = req.body;
    const { email, userId } = req.user;
    const secret = criarSecret(`${email}-${newEmail}`, userId);

    const isValid = verificarOTP(tokenOTP, secret);
    if (!tokenOTP || !isValid) {
      throw new CustomError(401, 'Token inválido');
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default verificarOTPMiddleware;
