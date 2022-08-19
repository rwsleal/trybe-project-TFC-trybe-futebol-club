import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);

  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
