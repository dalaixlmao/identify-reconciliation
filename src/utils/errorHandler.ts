export class CustomError extends Error {
    statusCode: number;
    isOperational: boolean;
  
    constructor(message: string, statusCode: number, isOperational: boolean = true) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class BadRequestError extends CustomError {
    constructor(message: string) {
      super(message, 400);
    }
  }
  
  export class NotFoundError extends CustomError {
    constructor(message: string) {
      super(message, 404);
    }
  }
  
  export class ConflictError extends CustomError {
    constructor(message: string) {
      super(message, 409);
    }
  }
  
  export class InternalServerError extends CustomError {
    constructor(message: string) {
      super(message, 500, false);
    }
  }