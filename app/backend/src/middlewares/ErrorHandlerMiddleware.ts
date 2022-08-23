import { Request, Response, NextFunction } from 'express';

export default class ErrorHandler {
  static Response = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err.message === 'Incorrect email or password') {
      return res.status(401).json({ message: err.message });
    }

    if (err.message.includes('token')) {
      return res.status(401).json({ message: err.message });
    }

    console.log(err);

    return res.status(500).json({ message: 'Internal server error' });
  };
}
