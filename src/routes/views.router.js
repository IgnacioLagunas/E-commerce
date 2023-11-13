import { Router } from 'express';
import ProductManager from '../managers/ProductsManager.js';
const pm = new ProductManager();

const router = Router();

router.get('/home', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('home', { ...req.session.user });
});

router.get('/product/:productId', async (req, res) => {
  const { productId } = req.params;
  const product = await pm.findProduct(productId);
  res.render('product', product);
});

router.get('/cart', (req, res) => {
  res.render('cart');
});

router.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/home');
  res.render('login');
});
router.get('/signup', (req, res) => {
  if (req.session.user) return res.redirect('/home');
  res.render('signup');
});
// router.get('/profile', (req, res) => {
//   if (!req.session.user) return res.redirect('/login');
//   res.render('profile', { ...req.session.user });
// });

export default router;
