import { cartModel } from '../db/models/cart.model.js';
import mongoose from 'mongoose';

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
    const result = await cartModel.findById(id).populate('products.product');
    return result;
  }
  async addProductToCart(cartId, productId) {
    const cart = await this.findCartById(cartId);
    const productIdMongo = new mongoose.Types.ObjectId(productId);
    const prodIndex = cart.products.findIndex((p) =>
      p.product._id.equals(productIdMongo)
    );
    prodIndex === -1
      ? cart.products.push({ product: productId })
      : cart.products[prodIndex].quantity++;
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
