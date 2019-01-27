import jwt from 'jsonwebtoken';
import config from '$/config';

export const TOKEN_TYPE = {
  AUTH: 'AUTH',
  RESET_PASSWORD: 'RESET_PASSWORD',
};

export const AUTH_TOKEN_EXPIRE_IN_SECONDS = config.server.security.jwt.auth.expireInSeconds;

// This is a function because env varibles is injected during runtime in dev env
const TOKEN_SETTINGS = () => ({
  // auth token is used for signup/login operations, and is valid for 30 days
  AUTH: {
    expireIn: AUTH_TOKEN_EXPIRE_IN_SECONDS,
    secret: process.env.JWT_AUTH_SECRET,
  },
  // reset token is used for resetting password, and is valid for 1 day
  RESET_PASSWORD: {
    expireIn: config.server.security.jwt.reset.expireInSeconds,
    secret: process.env.JWT_RESET_PASSWORD_SECRET,
  },
});

export const getUserFromToken = (token: string, type: string): Promise<Object> => {
  const settings = TOKEN_SETTINGS()[type];
  return new Promise((resolve, reject) => {
    jwt.verify(token, settings.secret, (err, decodedObject) => {
      if (err) {
        return reject();
      }
      return resolve(decodedObject.user);
    });
  });
};

export const generateTokenForUser = (user: {}, type: string) => {
  const settings = TOKEN_SETTINGS()[type];
  return jwt.sign({
    user,
  }, settings.secret, { expiresIn: settings.expireIn });
};
