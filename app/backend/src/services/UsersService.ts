import { bcryptHelper, jwtHelper } from '../helpers';
import { ILogin } from '../interfaces';
import Users from '../database/models/Users';

export default class UsersService {
  getByLogin = async (login: ILogin): Promise< string | null> => {
    const { email } = login;

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const { id, username, password } = user;

    bcryptHelper.checkPassword(login.password, password);

    const token = jwtHelper.createToken({ id, username });

    return token;
  };

  getRoleByToken = async (token: string): Promise<string | null> => {
    const { id } = jwtHelper.checkToken(token);

    const user = await Users.findByPk(
      id,
      { attributes: { exclude: ['password'] } },
    );

    if (!user) {
      return null;
    }

    const { role } = user;

    return role;
  };
}
