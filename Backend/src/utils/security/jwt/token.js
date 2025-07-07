import jwt from 'jsonwebtoken';

const gerarRefreshToken = (deviceId, userId, sessionId) => {
  const token = jwt.sign(
    { sub: sessionId, deviceId, userId },
    process.env.RT_SECRET,
    {
      expiresIn: process.env.RT_EXPIRESIN,
    },
  );
  return token;
};

const gerarAccessToken = (deviceId, userId) => {
  const token = jwt.sign({ sub: userId, deviceId }, process.env.AT_SECRET, {
    expiresIn: process.env.AT_EXPIRESIN,
  });
  return token;
};

const gerarForgotPassWordToken = (userId, email) => {
  const token = jwt.sign({ sub: userId, email }, process.env.PASST_SECRET, {
    expiresIn: process.env.PASST_EXPIRESIN,
  });
  return token;
};

const validarAccessToken = (token) => {
  const isValid = jwt.verify(token, process.env.AT_SECRET, (err, decoded) => {
    if (err) {
      return {
        success: false,
        error: err.message,
        decoded: decoded,
      };
    }
    return {
      success: true,
      data: decoded,
    };
  });
  return isValid;
};
const validarRefreshToken = (token) => {
  const isValid = jwt.verify(token, process.env.RT_SECRET, (err, decoded) => {
    if (err) {
      return {
        success: false,
        error: err.message,
      };
    }
    return {
      success: true,
      data: decoded,
    };
  });
  return isValid;
};
const validarForgotPassToken = (token) => {
  const isValid = jwt.verify(
    token,
    process.env.PASST_SECRET,
    (err, decoded) => {
      if (err) {
        return {
          success: false,
          error: err.message,
          decoded: decoded,
        };
      }
      return {
        success: true,
        data: decoded,
      };
    },
  );
  return isValid;
};

const decodeToken = (token) => {
  const decodedToken = jwt.decode(token);
  return decodedToken;
};

export {
  gerarAccessToken,
  gerarRefreshToken,
  gerarForgotPassWordToken,
  validarAccessToken,
  validarRefreshToken,
  validarForgotPassToken,
  decodeToken,
};
