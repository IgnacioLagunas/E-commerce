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
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.cart = user.cart;
  }
}
