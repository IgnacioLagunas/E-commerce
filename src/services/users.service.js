import UsersMongo from '../data-access/daos/users.dao.js';
import CartsMongo from '../data-access/daos/carts.dao.js';

class UsersService {
  async getAll() {
    return await UsersMongo.find();
  }

  async createOne(obj) {
    const { _id } = await CartsMongo.createOne();
    const newUser = { ...obj, cart: _id };
    console.log({ newUser });
    return await UsersMongo.createOne(newUser);
  }

  async updateOne(id, newObj) {
    return await UsersMongo.updateOne({ _id: id }, newObj);
  }

  async deleteOne(id) {
    return await UsersMongo.deleteOne({ _id: id });
  }

  async findOne(id) {
    return await UsersMongo.findOne(id);
  }

  async findOneByEmail(email) {
    return await UsersMongo.findByEmail({ email: email.toLowerCase() });
  }
}
export default UsersService = new UsersService();
