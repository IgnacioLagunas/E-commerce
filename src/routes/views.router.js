import { Router } from 'express';
import ViewsController from '../controllers/views.controller.js';
import { tokenValidationMiddleware } from '../middleware/jwt.middleware.js';

const router = Router();

router.get('/home', tokenValidationMiddleware, ViewsController.renderViewHome);

router.get('/product/:productId', ViewsController.renderViewProduct);

router.get('/cart', tokenValidationMiddleware, ViewsController.renderViewCart);

router.get('/login', ViewsController.renderViewLogin);

router.get('/signup', ViewsController.renderViewSignup);
// router.get('/profile', (req, res) => {
//   if (!req.session.user) return res.redirect('/login');
//   res.render('profile', { ...req.session.user });
// });

export default router;
