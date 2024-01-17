import CartsDao from '../data-access/daos/carts.dao.js';
import ProductsService from './products.service.js';
import mongoose from 'mongoose';

class CartsService {
  constructor(cartsDao) {
    this.cartsDao = cartsDao;
  }
  async findAll() {
    return await this.cartsDao.getAll();
  }

  async createOne() {
    const newCart = { products: [] };
    return await this.cartsDao.createOne(newCart);
  }

  async findOne(id) {
    return await this.cartsDao.findOne(id);
  }

  async addOrRemoveFromCart(cartId, productId, qtty = 1) {
    const cart = await this.cartsDao.findOne(cartId);
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
    return this.cartsDao.saveCart(cart);
    // return await this.cartsDao.updateOne(cartId, cart);
  }

  async deleteProductFromCart(cartId, productId) {
    const cart = await this.cartsDao.findOne(cartId);
    const productIdMongo = new mongoose.Types.ObjectId(productId);
    const prodIndex = cart.products.findIndex((p) =>
      p.product._id.equals(productIdMongo)
    );
    if (prodIndex != -1) cart.products.splice(prodIndex, 1);
    return this.cartsDao.saveCart(cart);
  }

  async clearCart(cartId) {
    const cart = await this.cartsDao.findOne(cartId);
    cart.products = [];
    return this.cartsDao.saveCart(cart);
  }

  async purchaseCart(cid) {
    const cart = await this.findOne(cid);
    return cart;
  }
}

export default CartsService = new CartsService(CartsDao);
