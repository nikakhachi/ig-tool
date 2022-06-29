class ValidationError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

class BadRequestError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = 400;
  }
}

type TypeCustomError = ValidationError;

export { TypeCustomError, ValidationError, BadRequestError };
