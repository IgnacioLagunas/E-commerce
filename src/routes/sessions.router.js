import { Router } from 'express';
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
    });
    req.session.user = { email, first_name, last_name, role };
    res.redirect('/home');
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
    req.session.user = { email, first_name: user.first_name, role: user.role };
    res.redirect('/home');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get('/signout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

export default router;
