import { Router } from 'express';

const router = Router();

router.get('/home', (req, res) => {
  res.render('home');
});

router.get('/user', (req, res) => {
  res.render('view2');
});

export default router;
