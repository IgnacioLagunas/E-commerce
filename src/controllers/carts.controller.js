import CartsService from '../services/carts.service.js';

class CartsController {
  getCart = async (req, res) => {
    const { cartId } = req.params;
    try {
      const cart = await CartsService.findOne(cartId);
      res.status(200).json({
        message: 'cart found',
        cart,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  createCart = async (req, res) => {
    try {
      const result = await CartsService.createOne();
      res.status(200).json({
        message: 'cart created',
        cart: result,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  updateCart = async (req, res) => {
    const { cartId, productId } = req.params;
    const { qtty = 1 } = req.query;
    try {
      await CartsService.addOrRemoveFromCart(cartId, productId, qtty);
      res.status(200).json({
        message: 'Product added to cart',
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteCart = async (req, res) => {
    const { cartId } = req.params;
    try {
      const result = await CartsService.clearCart(cartId);
      res.status(200).json({
        message: 'Cart cleared.',
        cart: result,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  deleteProductFromCart = async (req, res) => {
    const { cartId, productId } = req.params;
    try {
      await CartsService.deleteProductFromCart(cartId, productId);
      res.status(200).json({
        message: 'Product deleted from cart',
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default new CartsController();
