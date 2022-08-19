import { sign, SignOptions } from 'jsonwebtoken';
import { IPayload } from '../interfaces';
import 'dotenv/config';

const SECRET = process.env.JWT || 'jwt_secret';

export default function createJWT(payload: IPayload): string {
  const jwtConfig: SignOptions = { expiresIn: '7d', algorithm: 'HS256' };

  return sign({ data: payload }, SECRET, jwtConfig);
}
