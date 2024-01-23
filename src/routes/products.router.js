import { Router } from 'express';
import ProductsController from '../controllers/products.controller.js';
import { hasAuthorizedRoleMiddleware } from '../middleware/auth.middleware.js';
import { tokenValidationMiddleware } from '../middleware/jwt.middleware.js';

const router = Router();

router.get('/', ProductsController.getAllProducts);

router.get('/:id', ProductsController.findProduct);

router.post(
  '/',
  tokenValidationMiddleware,
  hasAuthorizedRoleMiddleware(['admin', 'premium']),
  ProductsController.createNewProduct
);

router.delete('/:id', ProductsController.deleteProduct);

export default router;
