import {
  UserNotAuthorizedError,
  UserNotLoggedInError,
} from '../errors/user.errors.js';

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
