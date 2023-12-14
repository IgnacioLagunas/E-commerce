import CartsMongo from '../data-access/daos/carts.dao.js';
import mongoose from 'mongoose';

class CartsService {
  async findAll() {
    return await CartsMongo.getAll();
  }

  async createOne() {
    const newCart = { products: [] };
    return await CartsMongo.createOne(newCart);
  }

  async findOne(id) {
    return await CartsMongo.findOne(id);
  }

  async addOrRemoveFromCart(cartId, productId, qtty = 1) {
    console.log('aqui');
    const cart = await CartsMongo.findOne(cartId);
    console.log(cart);
    const productIdMongo = new mongoose.Types.ObjectId(productId);
    const prodIndex = cart.products.findIndex((p) =>
      p.product._id.equals(productIdMongo)
    );
    if (prodIndex === -1) cart.products.push({ product: productId });
    else {
      cart.products[prodIndex].quantity += +qtty;
      if (cart.products[prodIndex].quantity == 0)
        cart.products.splice(prodIndex, 1);
    }
    return CartsMongo.saveCart(cart);
    // return await CartsMongo.updateOne(cartId, cart);
  }

  async deleteProductFromCart(cartId, productId) {
    const cart = await CartsMongo.findOne(cartId);
    const productIdMongo = new mongoose.Types.ObjectId(productId);
    const prodIndex = cart.products.findIndex((p) =>
      p.product._id.equals(productIdMongo)
    );
    if (prodIndex != -1) cart.products.splice(prodIndex, 1);
    return CartsMongo.saveCart(cart);
  }

  async clearCart(cartId) {
    const cart = await CartsMongo.findOne(cartId);
    cart.products = [];
    return CartsMongo.saveCart(cart);
  }
}

export default CartsService = new CartsService();
