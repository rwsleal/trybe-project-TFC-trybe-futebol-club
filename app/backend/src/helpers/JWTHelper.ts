import * as jwt from 'jsonwebtoken';
import { IPayload } from '../interfaces';
import 'dotenv/config';

const SECRET = process.env.JWT || 'jwt_secret';

type Data = {
  data: IPayload
};

export default class JWTHelper {
  static createToken(payload: IPayload): string {
    const jwtConfig:jwt.SignOptions = { expiresIn: '7d', algorithm: 'HS256' };

    return jwt.sign({ data: payload }, SECRET, jwtConfig);
  }

  static checkToken(token: string) {
    try {
      const decoded = jwt.verify(token, SECRET);
      const { data } = decoded as Data;

      return data;
    } catch (err) {
      throw new Error('Token must be a valid token');
    }
  }
}
