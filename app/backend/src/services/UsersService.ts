import { BcryptHelper, JWTHelper } from '../helpers';
import { ILogin } from '../interfaces';
import Users from '../database/models/Users';

export default class UsersService {
  getByLogin = async (login: ILogin): Promise< string | null> => {
    const { email } = login;

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      throw new Error('401|Incorrect email or password');
    }

    const { id, username, password } = user;

    BcryptHelper.checkPassword(login.password, password);

    const token = JWTHelper.createToken({ id, username });

    return token;
  };

  getRoleByToken = async (token: string): Promise<string | null> => {
    const { id } = JWTHelper.getTokenData(token);

    const user = await Users.findByPk(
      id,
      { attributes: { exclude: ['password'] } },
    );

    if (!user) {
      throw new Error('400|Role not found');
    }

    const { role } = user;

    return role;
  };
}
