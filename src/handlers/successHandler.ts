import { Response, NextFunction } from 'express';

export const SuccessHandler = (statusCode: number, message: string, res: Response, next: NextFunction, data: any) => {
  res.status(statusCode).send({
    status: 'success',
    statusCode,
    message,
    data: data ? data : null
  });
};