import { userModel } from '../db/models/user.model.js';

class UsersManager {
  async findAll() {
    const result = await userModel.find();
    return result;
  }

  async createOne(obj) {
    const result = await userModel.create(obj);
    return result;
  }

  async updateUser(id, newObj) {
    const result = await userModel.updateOne({ _id: id }, newObj);
    return result;
  }

  async deleteUser(id) {
    const result = await userModel.deleteOne({ _id: id });
    return result;
  }

  async findOne(id) {
    const result = await userModel.findById(id);
    return result;
  }

  async findUserByEmail(email) {
    const result = await userModel.findOne({ email: email.toLowerCase() });
    return result;
  }
}

export default UsersManager;
