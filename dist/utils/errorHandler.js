"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.ConflictError = exports.NotFoundError = exports.BadRequestError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CustomError = CustomError;
class BadRequestError extends CustomError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends CustomError {
    constructor(message) {
        super(message, 409);
    }
}
exports.ConflictError = ConflictError;
class InternalServerError extends CustomError {
    constructor(message) {
        super(message, 500, false);
    }
}
exports.InternalServerError = InternalServerError;
