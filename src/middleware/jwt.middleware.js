import jwt from 'jsonwebtoken';
const SECRET_KEY_JWT = 'secretoooo';

export const tokenValidation = (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];
    console.log('Auth: ', authHeader);
    const userInfo = jwt.verify(token, SECRET_KEY_JWT);
    req.user = userInfo;
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};
