import { Router } from 'express';
import ProductManager from '../managers/ProductsManager.js';
const pm = new ProductManager();

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await pm.findAll();
    res.status(200).json({ message: 'Products: ', products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pm.findProduct(id);
    res.status(200).json({ message: 'Product found', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { name, price } = req.body;
  if ((!name, !price)) {
    res.status(400).json({ message: 'missing data' });
  }
  try {
    const createdProduct = await pm.createProduct(req.body);
    res.status(200).json({ message: 'Product created', createdProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productDeleted = await pm.deleteProduct(id);
    res.status(200).json({ message: 'Product deleted', productDeleted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
