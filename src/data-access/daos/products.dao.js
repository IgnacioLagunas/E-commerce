import productModel from '../models/product.model.js';
import BasicMongoDAO from './basic.dao.js';

class ProductsMongo extends BasicMongoDAO {
  constructor() {
    super(productModel);
  }
  async getAllwithParams(params, query = {}) {
    console.log({ params });
    console.log({ query });

    return await productModel.paginate(query, params);
  }
}

export default ProductsMongo = new ProductsMongo();
