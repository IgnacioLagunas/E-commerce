import { Router } from 'express';
import passport from '../passport.js';
import { generateToken } from '../utils.js';
import UsersManager from '../managers/UsersManager.js';

const usersManager = new UsersManager();

const router = Router();

router.post('/signup', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if ((!first_name, !last_name, !email, !password)) {
    return res.status(400).json({ message: 'missing data' });
  }
  try {
    const user = await usersManager.findUserByEmail(email);
    if (user) return res.redirect('/login');
    const role = email == 'adminCoder@coder.com' ? 'admin' : 'user';
    await usersManager.createOne({
      ...req.body,
      role,
      origin: 'NONE',
    });
    // -- Con sessions --
    // req.session.user = { email, first_name, last_name, role };

    // -- Con jwt --
    const token = generateToken({ email, first_name, last_name });
    res.json('token', token);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    return res.status(400).json({ message: 'missing data' });
  }
  try {
    const user = await usersManager.findUserByEmail(email);
    if (!user) return res.redirect('/signup');
    // -- Con sessions --
    // req.session.user = { email, first_name: user.first_name, role: user.role };
    // res.redirect('/home');

    // -- Con jwt --
    const token = generateToken({
      email,
      first_name: user.first_name,
      last_name: user.last_name,
    });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get('/signout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// SIGNUP - LOGIN- GOOGLE

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log('Autenticacion exitosa');
    console.log('req.user en router.get auth: ', req.user);
    res.redirect('/home');
  }
);

export default router;
