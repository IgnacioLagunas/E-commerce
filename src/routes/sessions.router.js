import { Router } from 'express';
import passport from '../passport.js';
import SessionsController from '../controllers/sessions.controller.js';

const router = Router();

router.get('/current', SessionsController.getCurrent);

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
  (req, res) => {
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
  passport.authenticate('github', {
    failureRedirect: '/login',
    failureMessage: true,
  }),
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
