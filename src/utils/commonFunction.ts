import jwt from 'jsonwebtoken';
import { jwtExpireTime } from './constant';

export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: jwtExpireTime
  });
  return token;
};

export const verifyToken = (token: string) => {
  const verifyToken = jwt.verify(token, process.env.JWT_SECRET as string);
  return verifyToken;
};
