export class UserNotLoggedInError extends Error {
  constructor() {
    super();
    this.message = 'You have to be logged in to perform this action';
    this.name = 'UserNotLoggedInError';
    this.code = 401;
  }
}

export class UserNotAuthorizedError extends Error {
  constructor() {
    super();
    this.message = 'You are not authorized to perform this action';
    this.name = 'UserNotAuthorizedError';
    this.code = 401;
  }
}

export class SamePasswordAsBeforeError extends Error {
  constructor() {
    super();
    this.message = 'You cannot use the same password as before';
    this.name = 'SamePasswordAsBeforeError';
    this.code = 401;
  }
}
