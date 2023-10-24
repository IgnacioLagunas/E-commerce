import { Router } from 'express';
import UsersManager from '../managers/UsersManager.js';

const usersManager = new UsersManager();

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await usersManager.findAll();
    res.status(200).json({ message: 'users: ', users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersManager.findUser(id);
    res.status(200).json({ message: 'User found', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { first_name, last_name, email } = req.body;
  if ((!first_name, !last_name, !email)) {
    res.status(400).json({ message: 'missing data' });
  }
  try {
    const createduser = await usersManager.createUser(req.body);
    res.status(200).json({ message: 'User created', createduser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userDeleted = await usersManager.deleteUser(id);
    res.status(200).json({ message: 'User deleted', userDeleted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
