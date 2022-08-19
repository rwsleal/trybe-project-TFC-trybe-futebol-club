import * as bcrypt from 'bcryptjs';

export default function checkPassword(inputPassword:string, passwordHash:string) {
  const check = bcrypt.compareSync(inputPassword, passwordHash);

  if (!check) {
    throw new Error('Incorrect email or password');
  }
}
