import { Router } from 'express';
import CartsManager from '../managers/CartsManager.js';
const cm = new CartsManager();

const router = Router();

router.get('/:cartId', async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await cm.findCartById(cartId);
    res.status(200).json({
      message: 'cart found',
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    await cm.createCart();
    res.status(200).json({
      message: 'cart created',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:cartId/product/:productId', async (req, res) => {
  const { cartId, productId } = req.params;
  try {
    await cm.addProductToCart(cartId, productId);
    res.status(200).json({
      message: 'Product added to cart',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
