import { totp } from 'otplib';

totp.options = { digits: 6, step: 300, window: 1 };

const criarSecret = (text, userId) => {
  return `${process.env.OTP_SECRET}+${text}+${userId}`;
};

const gerarOTP = (secret) => {
  return totp.gerar(secret);
};

const verificarOTP = (token, secret) => {
  return totp.check(token, secret, { window: 1 });
};

export { gerarOTP, verificarOTP, criarSecret };
