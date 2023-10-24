import { cartModel } from '../db/models/cart.model.js';

class CartsManager {
  async findAll() {
    const result = await cartModel.find();
    return result;
  }

  async createCart() {
    const newCart = { products: [] };
    const result = await cartModel.create(newCart);
    return result;
  }

  async findCartById(id) {
    const result = await cartModel.findById(id);
    return result;
  }
  async addProductToCart(cartId, productId) {
    const cart = await this.findCartById(cartId);
    const prodIndex = cart.products.findIndex((p) => p.product === productId);
    prodIndex === -1
      ? cart.products.push({ product: productId })
      : cart.products[prodIndex].quantity++;
    return cart.save();
  }

  async deleteProduct(id) {
    const result = await cartModel.deleteOne({ _id: id });
    return result;
  }
}

export default CartsManager;
