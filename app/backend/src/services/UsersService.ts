import { createJWT, checkPassword } from '../helpers';
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

    checkPassword(login.password, password);

    const token = createJWT({ id, username });

    return token;
  };
}