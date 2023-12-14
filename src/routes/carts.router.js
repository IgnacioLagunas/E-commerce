import { Router } from 'express';
import CartsController from '../controllers/carts.controller.js';

const router = Router();

router.get('/:cartId', CartsController.getCart);

router.post('/', CartsController.createCart);

router.put('/:cartId/product/:productId', CartsController.updateCart);

router.delete('/:cartId', CartsController.deleteCart);

router.delete(
  '/:cartId/product/:productId',
  CartsController.deleteProductFromCart
);
export default router;
