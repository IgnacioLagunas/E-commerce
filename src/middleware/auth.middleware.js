import {
  UserNotAuthorizedError,
  UserNotLoggedInError,
} from '../errors/user.errors.js';

import ProductsService from '../services/products.service.js';

export const hasAuthorizedRoleMiddleware = (roleList) => {
  return (req, res, next) => {
    try {
      if (!req.user) throw new UserNotLoggedInError();
      if (roleList.includes(req.user.role)) {
        return next();
      }
      throw new UserNotAuthorizedError();
    } catch (error) {
      if (error.name !== 'Error') {
        res.status(error.code).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };
};

export const productAuthorizathionMiddleware = async (req, res, next) => {
  try {
    const {
      params: { id },
      user,
    } = req;
    const product = await ProductsService.findOne(id);
    if (
      user.role === 'admin' ||
      (user.role === 'premium' && user.email === product.owner)
    ) {
      return next();
    }
    throw new UserNotAuthorizedError();
  } catch (error) {
    if (error.name !== 'Error') {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
