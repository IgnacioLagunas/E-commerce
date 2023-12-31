import config from '../config/config.js';
import ProductsService from '../services/products.service.js';

class ViewsController {
  renderViewHome = (req, res) => {
    res.render('home', req.user);
  };

  renderViewProduct = async (req, res) => {
    const { productId } = req.params;
    const product = await ProductsService.findOne(productId);
    res.render('product', product);
  };

  renderViewCart = (req, res) => {
    res.render('cart');
  };

  renderViewLogin = (req, res) => {
    console.log(req.session);
    console.log(config.GOOGLE_CLIENT_ID);
    if (req.user) return res.redirect('/home');
    const message = req.session.messages
      ? req.session.messages[req.session.messages.length - 1]
      : '';
    res.render('login', {
      message,
    });
  };

  renderViewSignup = (req, res) => {
    if (req.user) return res.redirect('/home');
    res.render('signup');
  };
}

export default new ViewsController();
