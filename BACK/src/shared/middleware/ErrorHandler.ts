import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../utils/AppError';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  console.error('ERROR:', err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message
    });

    return;
  }

  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
};