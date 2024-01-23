import { generateNewToken } from '../utils/jwt.utils.js';
import passport from 'passport';

export const tokenValidationMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      // Si hay un error o el usuario no existe, redirige a la página de inicio de sesión
      return res.redirect('/login');
    }
    // Si el usuario existe, agrega la información del usuario al objeto req
    req.user = user;
    return next();
  })(req, res, next);
};

export const createNewTokenAndSendToCookieMiddleware = (req, res, next) => {
  try {
    const token = generateNewToken(req.user);
    res.cookie('token', token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    next();
  } catch (error) {
    res.status(500).json(error.message);
  }
};
