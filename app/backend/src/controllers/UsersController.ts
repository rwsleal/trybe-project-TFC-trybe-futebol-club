import { Request, Response } from 'express';
import { UsersService } from '../services';

export default class UsersController {
  constructor(private usersService: UsersService) {
    this.usersService = usersService;
  }

  getByLogin = async (req: Request, res: Response) => {
    const result = await this.usersService.getByLogin(req.body);

    return res.status(200).json({ token: result });
  };

  getRoleByToken = async (req: Request, res: Response) => {
    const token = req.headers.authorization;

    const result = await this.usersService.getRoleByToken(token as string);

    return res.status(200).json({ role: result });
  };
}
