import UsersDao from '../data-access/daos/users.dao.js';
import { UserDB } from '../data-access/dtos/userDTOs.js';
import { logger } from '../utils/logger.utils.js';
import CartsService from './carts.service.js';

class UsersService {
  constructor(UsersDao, CartsService) {
    this.usersDao = UsersDao;
    this.cartsService = CartsService;
  }
  async getAll() {
    return await this.usersDao.getAll();
  }

  async createOne(obj) {
    const { _id: cart_id } = await this.cartsService.createOne();
    const newUser = new UserDB({ ...obj, cart: cart_id });
    logger.http('Nuevo usuario: ', { newUser });
    return await this.usersDao.createOne(newUser);
  }

  async updateOne(id, newObj) {
    const user = await this.findOne(id);
    const newUser = { ...user._doc, ...newObj };
    logger.http('Usuario actualizado: ', { newUser });
    return await this.usersDao.updateOne({ _id: id }, newUser);
  }

  async deleteOne(id) {
    return await this.usersDao.deleteOne({ _id: id });
  }

  async findOne(id) {
    return await this.usersDao.findOne(id);
  }

  async findOneByEmail(email) {
    return await this.usersDao.findByEmail({ email: email.toLowerCase() });
  }
}
export default UsersService = new UsersService(UsersDao, CartsService);
