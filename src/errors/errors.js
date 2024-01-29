export class EntitiyNotFoundError extends Error {
  constructor(entity) {
    super();
    this.message = `${entity} not found`;
    this.name = 'EntityNotFoundError';
    this.code = 404;
  }
}

export class MissingDataError extends Error {
  constructor() {
    super();
    this.message = `Missing data`;
    this.name = 'MissingDataError';
    this.code = 400;
  }
}
