import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err.message === 'Incorrect email or password') {
    return res.status(401).json({ message: err.message });
  }

  console.log(err);

  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
