import UsersService from '../services/users.service.js';

class UsersController {
  getAllUsers = async (req, res) => {
    try {
      const users = await UsersService.getAll();
      res.status(200).json({ message: 'users: ', users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  findUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UsersService.findOne(id);
      res.status(200).json({ message: 'User found', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  createNewUser = async (req, res) => {
    try {
      const { first_name, last_name, email } = req.body;
      if ((!first_name, !last_name, !email)) {
        res.status(400).json({ message: 'missing data' });
      }
      const createdUser = await UsersService.createOne(req.body);
      res.status(200).json({ message: 'User created', createdUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const update = req.body;
      await UsersService.updateOne(id, update);
      res.status(200).json({ message: 'User updated' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const userDeleted = await UsersService.deleteOne(id);
      res.status(200).json({ message: 'User deleted', userDeleted });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default new UsersController();
