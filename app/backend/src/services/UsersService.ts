import { bcryptHelper, jwtHelper } from '../helpers';
import { ILogin } from '../interfaces';
import Users from '../database/models/Users';

export default class UsersService {
  getByLogin = async (login: ILogin): Promise< string | null> => {
    const { email } = login;

    const user = await Users.findOne({ where: { email } });
    console.log(user);

    if (!user) {
      return null;
    }

    const { id, username, password } = user;

    bcryptHelper.checkPassword(login.password, password);

    const token = jwtHelper.createToken({ id, username });

    return token;
  };
}
