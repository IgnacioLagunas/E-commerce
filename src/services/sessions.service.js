import { UserResponse } from '../data-access/dtos/userDTOs.js';

class SessionsService {
  getCurrentSession = (req) => {
    console.log(req.user);
    return new UserResponse(req.user);
  };
}

export default new SessionsService();
