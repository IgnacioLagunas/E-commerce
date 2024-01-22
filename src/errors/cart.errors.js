export class CartNotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Cart not found';
    this.name = 'CartNotFoundError';
  }
}

export class CartIsEmptyError extends Error {
  constructor() {
    super();
    this.message =
      'You need to have at least one product in your cart to perform this action';
    this.name = 'CartIsEmptyError';
  }
}
