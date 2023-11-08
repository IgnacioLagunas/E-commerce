import { productModel } from '../db/models/product.model.js';

class ProductManager {
  async findAll(params) {
    const { limit = 10, sort = null, page = 1, query = {} } = params;
    const result = await productModel.paginate(query, {
      limit,
      page,
      sort: sort ? { price: sort } : null,
    });
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
