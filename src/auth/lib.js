import jwt from 'jsonwebtoken';
import config from '$/config';

export const getUserFromToken = (token: string): Promise<Object> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.server.secrets.jwt, (err, decodedObject) => {
      if (err) {
        return reject();
      }
      return resolve(decodedObject.user);
    });
  });
};

export const generateTokenForUser = (user: {}) => {
  return jwt.sign({
    user,
  }, config.server.secrets.jwt, { expiresIn: 60 * 60 * 24 * 24 });
};
