import ProductsDao from '../data-access/daos/products.dao.js';
import { EntitiyNotFoundError } from '../errors/errors.js';

class ProductsService {
  constructor(ProductsDao) {
    this.productsDao = ProductsDao;
  }

  async getAll() {
    return await this.productsDao.getAll();
  }

  async getAllwithParams(params) {
    const { limit = 10, sort = null, page = 1, query = {} } = params;
    console.log(query);
    const result = await this.productsDao.getAllwithParams(
      {
        limit,
        page,
        sort: sort ? { price: sort } : null,
      },
      typeof query === 'string' ? JSON.parse(query) : query
    );
    return result;
  }

  async createOne(obj) {
    const result = await this.productsDao.createOne(obj);
    return result;
  }

  async updateOne(id, newObj) {
    console.log('en service');
    const product = await this.findOne(id);
    if (!product) throw new EntitiyNotFoundError('Product');
    const newProduct = { ...product._doc, ...newObj };
    console.log({ newProduct });
    return await this.productsDao.updateOne({ _id: id }, newProduct);
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
