import { Router } from 'express';
import ViewsController from '../controllers/views.controller.js';
import { tokenValidationMiddleware } from '../middleware/jwt.middleware.js';

const router = Router();

router.get('/home', tokenValidationMiddleware, ViewsController.renderViewHome);

router.get(
  '/profile',
  tokenValidationMiddleware,
  ViewsController.renderViewProfile
);

router.get(
  '/product/:productId',
  tokenValidationMiddleware,
  ViewsController.renderViewProduct
);

router.get('/cart', tokenValidationMiddleware, ViewsController.renderViewCart);

router.get('/login', ViewsController.renderViewLogin);

router.get('/signup', ViewsController.renderViewSignup);

router.get(
  '/change-password/:id/:token',
  ViewsController.renderViewChangePassword
);

router.get('/forgot-password', ViewsController.renderViewForgotPassword);

export default router;
