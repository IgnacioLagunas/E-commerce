import { Router } from 'express';
import ProductsController from '../controllers/products.controller.js';

const router = Router();

router.get('/', ProductsController.getAllProducts);

router.get('/:id', ProductsController.findProduct);

router.post('/', ProductsController.createNewProduct);

router.delete('/:id', ProductsController.deleteProduct);

export default router;
