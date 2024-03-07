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
export class MissingRequiredDocumentsError extends Error {
  constructor(missingDocuments) {
    super();
    this.message = `Required documents missing: ${missingDocuments}`;
    this.name = 'MissingRequiredDocumentsError';
    this.code = 401;
  }
}
export class UserAlreadyAPremiumMemberError extends Error {
  constructor() {
    super();
    this.message = 'User is already a premium member';
    this.name = 'UserAlreadyAPremiumMemberError';
    this.code = 401;
  }
}
