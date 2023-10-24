import { productModel } from '../db/models/product.model.js';

class ProductManager {
  async findAll() {
    const result = await productModel.find();
    return result;
  }

  async createProduct(obj) {
    const result = await productModel.create(obj);
    return result;
  }

  async updateProduct(id, newObj) {
    const result = await productModel.updateOne({ _id: id }, newObj);
    return result;
  }

  async deleteProduct(id) {
    const result = await productModel.deleteOne({ _id: id });
    return result;
  }

  async findProduct(id) {
    const result = await productModel.findById(id);
    return result;
  }
}

export default ProductManager;
