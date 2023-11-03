import { Router } from 'express';

const router = Router();

router.get('/home', (req, res) => {
  res.render('home');
});

router.get('/cart', (req, res) => {
  res.render('cart');
});

export default router;
