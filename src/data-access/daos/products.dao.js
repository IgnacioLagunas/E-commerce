import { logger } from '../../utils/logger.utils.js';
import productModel from '../models/product.model.js';
import BasicMongoDAO from './basic.dao.js';

class ProductsMongo extends BasicMongoDAO {
  constructor() {
    super(productModel);
  }
  async getAllwithParams(params, query = {}) {
    logger.info({ params });
    logger.info({ query });

    return await productModel.paginate(query, params);
  }
}

export default ProductsMongo = new ProductsMongo();
