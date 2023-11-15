import { dirname } from 'path';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
export const __dirname = dirname(fileURLToPath(import.meta.url));

const SECRET_KEY_JWT = 'secretoooo';

export const generateToken = (user) => {
  const token = jwt.sign(user, SECRET_KEY_JWT, { expiresIn: 300 });
  return token;
};
