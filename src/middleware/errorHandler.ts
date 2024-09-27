import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/errorHandler';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof CustomError) {
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