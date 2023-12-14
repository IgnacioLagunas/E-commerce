import ProductsService from '../services/products.service.js';

class ProductsController {
  getAllProducts = async (req, res) => {
    let { limit, page, sort, query } = req.query;
    console.log({ sort });
    if (!['asc', 'desc'].includes(sort)) sort = null;
    try {
      const products = await ProductsService.getAllwithParams({
        limit,
        page,
        sort,
        query,
      });
      res.status(200).json({
        message: 'Products: ',
        products: {
          ...products,
          nextLink: products.hasNextPage
            ? `http://localhost:8080/api/products?limit=${limit}&sort=${sort}&page=${products.nextPage}`
            : null,
          prevLink: products.hasPrevPage
            ? `http://localhost:8080/api/products?limit=${limit}&sort=${sort}&page=${products.prevPage}`
            : null,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  findProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductsService.findOne(id);
      res.status(200).json({ message: 'Product found', product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  createNewProduct = async (req, res) => {
    const { name, price } = req.body;
    if ((!name, !price)) {
      res.status(400).json({ message: 'missing data' });
    }
    try {
      const createdProduct = await ProductsService.createOne(req.body);
      res.status(200).json({ message: 'Product created', createdProduct });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const productDeleted = await ProductsService.deleteOne(id);
      res.status(200).json({ message: 'Product deleted', productDeleted });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default new ProductsController();
