import { dirname } from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
export const __dirname = dirname(fileURLToPath(import.meta.url));

const SECRET_KEY_JWT = 'secretoooo';

export const generateToken = (user) => {
  const token = jwt.sign(user, SECRET_KEY_JWT, { expiresIn: 300 });
  return token;
};

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isPasswordValid = (user, password) => {
  if (!user.password) return false;
  return bcrypt.compareSync(password, user.password);
};
