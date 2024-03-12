import { createHash } from '../../utils/password.utils.js';

export const UserResponse = (user) => {
  return {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    role: user.role,
  };
};

export const UserResponseWithCart = (user) => {
  return {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    cart: user.cart,
    role: user.role,
  };
};

export const UserJWT = (user) => {
  return {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
  };
};

export class UserDB {
  constructor(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.username
      ? user.username.toLowerCase()
      : user.email.toLowerCase();
    this.password = user.password ? createHash(user.password) : null;
    this.role = user.role;
    this.cart = user.cart;
  }
}
