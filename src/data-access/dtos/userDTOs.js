import { createHash } from '../../utils.js';

export class UserResponse {
  constructor(user) {
    this.name = `${user.first_name} ${user.last_name}`;
    this.email = user.email;
    this.cart = user.cart;
  }
}

export class UserDB {
  constructor(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.username
      ? user.username.toLowerCase()
      : user.email.toLowerCase();
    this.password = createHash(user.password);
    this.role = user.role;
    this.cart = user.cart;
  }
}

export const UserJWT = (user) => {
  return {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
  };
};
