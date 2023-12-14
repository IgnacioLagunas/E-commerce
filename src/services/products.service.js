import ProductsMongo from '../data-access/daos/products.dao.js';

class ProductsService {
  async getAll() {
    return await ProductsMongo.getAll();
  }
  async getAllwithParams(params) {
    const { limit = 10, sort = null, page = 1, query = {} } = params;
    const result = await ProductsMongo.getAllwithParams(
      {
        limit,
        page,
        sort: sort ? { price: sort } : null,
      },
      query
    );
    return result;
  }

  async createOne(obj) {
    const result = await ProductsMongo.createOne(obj);
    return result;
  }

  async updateOne(id, newObj) {
    const result = await ProductsMongo.updateOne({ _id: id }, newObj);
    return result;
  }

  async deleteOne(id) {
    const result = await ProductsMongo.deleteOne({ _id: id });
    return result;
  }

  async findOne(id) {
    const result = await ProductsMongo.findOne(id);
    return result;
  }
}

export default ProductsService = new ProductsService();
