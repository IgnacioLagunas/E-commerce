import { Router } from 'express';
import ProductManager from '../ProductsManager.js';
const pm = new ProductManager();

const router = Router();

router.get('/', async (req, res) => {
  const { limit } = req.query;
  const products = await pm.getProducts();
  limit ? res.json(products.slice(0, limit)) : res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await pm.getProductById(+req.params.id);
  res.json(product);
});

router.post('/', () => {});

router.delete('/:id', () => {});

export default router;
