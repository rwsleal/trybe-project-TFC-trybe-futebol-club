import { Router } from 'express';
import { validationMiddleware } from '../middlewares';
import loginSchema from '../Schemas/loginSchema';
import UsersService from '../services';
import UsersController from '../controllers';

const loginRouter = Router();

const usersService = new UsersService();
const usersController = new UsersController(usersService);

loginRouter.post(
  '/',
  validationMiddleware(loginSchema),
  usersController.getByLogin,
);

export default loginRouter;
