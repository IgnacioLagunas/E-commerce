import { Router } from 'express';
import passport from '../passport.js';
import { generateToken } from '../utils.js';
import UsersManager from '../managers/UsersManager.js';

const usersManager = new UsersManager();

const router = Router();

router.post(
  '/login',
  passport.authenticate('login', {
    failureRedirect: '/login',
    successRedirect: '/home',
  })
);

router.post(
  '/signup',
  passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
  })
);

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
    res.redirect('/home');
  }
);

// SIGNUP - LOGIN- GITHUB

router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  }
);

// SIGNOUT

router.get('/signout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});
export default router;
