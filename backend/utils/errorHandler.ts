import { Request, Response, NextFunction } from 'express';
import { ValidateError } from 'tsoa';
import { AuthenticationError } from './customError';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response, 
  next: NextFunction 
): void {
  if (err instanceof ValidateError) {
    console.error('Validation Error:', err.fields);

    res.status(400).json({
      message: 'Validation Failed',
      error: err.fields,
    });
  } 
    else if (err instanceof AuthenticationError) {

        res.status(401).json({
            message: 'AuthenticationError',
            error: err.message,
        });
    }
    else if (err instanceof Error) {

        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message,
        });
    } else {
        next(err);
    }
}
