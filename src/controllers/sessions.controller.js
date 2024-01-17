import { UserResponse } from '../data-access/dtos/userDTOs.js';
class SessionsController {
  getCurrent = (req, res) => {
    res.json({ user: new UserResponse(req.user) });
  };
}

export default new SessionsController();
