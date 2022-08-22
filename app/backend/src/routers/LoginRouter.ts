import { Router } from 'express';
import { ValidationHandler } from '../middlewares';
import loginSchema from '../Schemas/loginSchema';
import UsersService from '../services';
import UsersController from '../controllers';
import TokenHandler from '../middlewares/TokenHandlerMiddleware';

const loginRouter = Router();

const usersService = new UsersService();
const usersController = new UsersController(usersService);

loginRouter.post(
  '/',
  ValidationHandler.checkJoiSchema(loginSchema),
  usersController.getByLogin,
);

loginRouter.get(
  '/validate',
  TokenHandler.checkToken,
  usersController.getRoleByToken,
);

export default loginRouter;
