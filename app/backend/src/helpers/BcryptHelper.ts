import * as bcrypt from 'bcryptjs';

require('express-async-errors');

export default class BcryptHelper {
  static checkPassword(inputPassword:string, passwordHash:string) {
    const check = bcrypt.compareSync(inputPassword, passwordHash);

    if (!check) {
      throw new Error('Incorrect email or password');
    }
  }
}
