"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler_1 = require("../utils/errorHandler");
const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err instanceof errorHandler_1.CustomError) {
        return res.status(err.statusCode).json({
            error: {
                message: err.message,
                status: err.statusCode,
            },
        });
    }
    res.status(500).json({
        error: {
            message: 'An unexpected error occurred',
            status: 500,
        },
    });
};
exports.errorHandler = errorHandler;
