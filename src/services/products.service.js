import ProductsDao from '../data-access/daos/products.dao.js';

class ProductsService {
  constructor(ProductsDao) {
    this.productsDao = ProductsDao;
  }

  async getAll() {
    return await this.productsDao.getAll();
  }
  async getAllwithParams(params) {
    const { limit = 10, sort = null, page = 1, query = {} } = params;
    const result = await this.productsDao.getAllwithParams(
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
    const result = await this.productsDao.createOne(obj);
    return result;
  }

  async updateOne(id, newObj) {
    const result = await this.productsDao.updateOne({ _id: id }, newObj);
    return result;
  }

  async deleteOne(id) {
    const result = await this.productsDao.deleteOne({ _id: id });
    return result;
  }

  async findOne(id) {
    const result = await this.productsDao.findOne(id);
    return result;
  }
}

export default ProductsService = new ProductsService(ProductsDao);
