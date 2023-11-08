import { Router } from 'express';
import ProductManager from '../managers/ProductsManager.js';
const pm = new ProductManager();

const router = Router();

router.get('/home', (req, res) => {
  res.render('home');
});

router.get('/product/:productId', async (req, res) => {
  const { productId } = req.params;
  const product = await pm.findProduct(productId);
  res.render('product', product);
});

router.get('/cart', (req, res) => {
  res.render('cart');
});

export default router;
