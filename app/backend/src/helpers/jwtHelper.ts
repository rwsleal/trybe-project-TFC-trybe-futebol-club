import * as jwt from 'jsonwebtoken';
import { IPayload } from '../interfaces';
import 'dotenv/config';

const SECRET = process.env.JWT || 'jwt_secret';

export default class jwtHelper {
  static createToken(payload: IPayload): string {
    const jwtConfig:jwt.SignOptions = { expiresIn: '7d', algorithm: 'HS256' };

    return jwt.sign({ data: payload }, SECRET, jwtConfig);
  }

  static checkToken(token: string) {
    try {
      const payload = jwt.verify(token, SECRET);

      return payload;
    } catch (err) {
      throw new Error('Token must be a valid token');
    }
  }
}
