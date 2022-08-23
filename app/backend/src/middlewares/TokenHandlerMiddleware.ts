import { Response, NextFunction, Request } from 'express';
import { JWTHelper } from '../helpers';

export default class TokenHandler {
  static checkToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not provided' });

    JWTHelper.checkToken(token);
    next();
  };
}
