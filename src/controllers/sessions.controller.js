import { UserResponse } from '../data-access/dtos/userDTOs.js';
import SessionsService from '../services/sessions.service.js';
class SessionsController {
  getCurrent = (req, res) => {
    res.json({ user: SessionsService.getCurrentSession(req) });
  };
}

export default new SessionsController();
