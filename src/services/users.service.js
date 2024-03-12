import UsersDao from '../data-access/daos/users.dao.js';
import { UserDB } from '../data-access/dtos/userDTOs.js';
import {
  MissingRequiredDocumentsError,
  UserAlreadyAPremiumMemberError,
} from '../errors/user.errors.js';
import { logger } from '../utils/logger.utils.js';
import { sendAccountDeletionEmail } from '../utils/mailer.utils.js';
import { returnMissingDocuments } from '../utils/users.utils.js';
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

  async upgradeUser(id) {
    const user = await this.findOne(id);
    if (user.role === 'admin' || user.role === 'premium') {
      throw new UserAlreadyAPremiumMemberError();
    }
    const missingDocuments = returnMissingDocuments(user);
    if (missingDocuments.length > 0) {
      throw new MissingRequiredDocumentsError(missingDocuments);
    }

    return await this.updateOne(id, { role: 'premium' });
  }

  async saveDocuments(id, uploadedDocuments) {
    const { documents: documentsArray } = await this.findOne(id);
    for (const documentType in uploadedDocuments) {
      const existingDocumentIndex = documentsArray.findIndex(
        (doc) => doc.name === documentType
      );

      if (existingDocumentIndex !== -1) {
        // Si ya existe un documento con el mismo nombre, reemplaza el documento existente
        documentsArray[existingDocumentIndex] = {
          name: uploadedDocuments[documentType][0].fieldname,
          reference: uploadedDocuments[documentType][0].path,
        };
      } else {
        // Agrega el nuevo documento al array de documentos
        documentsArray.push({
          name: uploadedDocuments[documentType][0].fieldname,
          reference: uploadedDocuments[documentType][0].path,
        });
      }
    }

    // Actualiza el campo 'documents' en el objeto del usuario
    return await this.updateOne(id, { documents: documentsArray });
  }

  async deleteOne(id) {
    const res = await this.usersDao.deleteOne({ _id: id });
    logger.info('Usuario eliminado: ', { id });
    return res;
  }

  async deleteInnactive() {
    // Buscar usuarios inactivos
    const fechaDosDiasAtras = new Date();
    fechaDosDiasAtras.setDate(fechaDosDiasAtras.getDate() - 2);

    try {
      const innactiveUsers = await this.usersDao.findOne({
        last_connection: { $lt: fechaDosDiasAtras },
      });
      if (innactiveUsers.length === 0) {
        logger.error('No hay usuarios inactivos');
        return;
      }
      innactiveUsers.forEach(async (user) => {
        await sendAccountDeletionEmail(user);
        await this.deleteOne(user._id);
      });
      return;
    } catch (error) {
      console.error('Error al buscar usuarios inactivos:', error);
      return;
    }
  }

  async findOne(id) {
    return await this.usersDao.findOneById(id);
  }

  async findOneByEmail(email) {
    return await this.usersDao.findByEmail({ email: email.toLowerCase() });
  }
}
export default UsersService = new UsersService(UsersDao, CartsService);
