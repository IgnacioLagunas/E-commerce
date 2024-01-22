import { UserResponse } from '../data-access/dtos/userDTOs.js';

class SessionsService {
  getCurrentSession = (req) => {
    return new UserResponse(req.user);
  };
}

export default new SessionsService();
