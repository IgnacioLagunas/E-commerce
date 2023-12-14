import { Router } from 'express';
import { isLogedMiddleware } from '../middleware/auth.middleware.js';
import ViewsController from '../controllers/views.controller.js';

const router = Router();

router.get('/home', isLogedMiddleware, ViewsController.renderViewHome);

router.get('/product/:productId', ViewsController.renderViewProduct);

router.get('/cart', isLogedMiddleware, ViewsController.renderViewCart);

router.get('/login', ViewsController.renderViewLogin);

router.get('/signup', ViewsController.renderViewSignup);
// router.get('/profile', (req, res) => {
//   if (!req.session.user) return res.redirect('/login');
//   res.render('profile', { ...req.session.user });
// });

export default router;
