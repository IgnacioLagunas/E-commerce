import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { UserJWT } from '../data-access/dtos/userDTOs.js';
import { Error } from 'mongoose';

export const generateNewToken = (user) => {
  console.log(UserJWT(user));
  return jwt.sign(UserJWT(user), config.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new Error('Could not verify token');
    } else {
      return decoded;
    }
  });
};
