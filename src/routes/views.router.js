import { Router } from 'express';
import { isLogedMiddleware } from '../middleware/auth.middleware.js';
import ProductManager from '../managers/ProductsManager.js';
const pm = new ProductManager();

const router = Router();

router.get('/home', isLogedMiddleware, (req, res) => {
  res.render('home', req.user);
});

router.get('/product/:productId', async (req, res) => {
  const { productId } = req.params;
  const product = await pm.findProduct(productId);
  res.render('product', product);
});

router.get('/cart', isLogedMiddleware, (req, res) => {
  res.render('cart');
});

router.get('/login', (req, res) => {
  console.log(req.session);
  if (req.user) return res.redirect('/home');
  const message = req.session.messages
    ? req.session.messages[req.session.messages.length - 1]
    : '';
  res.render('login', {
    message,
  });
});
router.get('/signup', (req, res) => {
  if (req.user) return res.redirect('/home');
  res.render('signup');
});
// router.get('/profile', (req, res) => {
//   if (!req.session.user) return res.redirect('/login');
//   res.render('profile', { ...req.session.user });
// });

export default router;
