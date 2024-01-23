import userModel from '../models/user.model.js';
import BasicMongoDAO from './basic.dao.js';

class UsersMongo extends BasicMongoDAO {
  constructor() {
    super(userModel);
  }

  async findOne(id) {
    const result = await userModel.findById(id).populate({
      path: 'cart',
    });
    return result;
  }

  async findByEmail(email) {
    return await userModel.findOne(email).populate({
      path: 'cart',
    });
  }
}

export default UsersMongo = new UsersMongo();
