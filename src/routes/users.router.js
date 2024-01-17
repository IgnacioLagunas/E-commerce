import { Router } from 'express';
import UsersController from '../controllers/users.controller.js';

const router = Router();

router.get('/', UsersController.getAllUsers);

router.get('/:id', UsersController.findUserById);

router.post('/', UsersController.createNewUser);

router.put('/:id', UsersController.updateUser);

router.delete('/:id', UsersController.deleteUser);

export default router;
