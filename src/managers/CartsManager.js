import { cartModel } from '../db/models/cart.model.js';
import mongoose from 'mongoose';

class CartsManager {
  async findAll() {
    const result = await cartModel.find();
    return result;
  }

  async createOne() {
    const newCart = { products: [] };
    const result = await cartModel.create(newCart);
    return result;
  }

  async findCartById(id) {
    const result = await cartModel.findById(id).populate('products.product');
    return result;
  }

  async addOrRemoveFromCart(cartId, productId, qtty = 1) {
    const cart = await this.findCartById(cartId);
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
    return cart.save();
  }

  async deleteProductFromCart(cartId, productId) {
    const cart = await this.findCartById(cartId);
    const productIdMongo = new mongoose.Types.ObjectId(productId);
    const prodIndex = cart.products.findIndex((p) =>
      p.product._id.equals(productIdMongo)
    );
    if (prodIndex != -1) cart.products.splice(prodIndex, 1);
    return cart.save();
  }
  // async deleteProduct(id) {
  //   const result = await cartModel.deleteOne({ _id: id });
  //   return result;
  // }

  async clearCart(cartId) {
    const cart = await cartModel.findById(cartId);
    cart.products = [];
    return cart.save();
  }
}

export default CartsManager;
