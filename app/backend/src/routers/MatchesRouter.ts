import { Router } from 'express';
import { TokenHandler } from '../middlewares';
import { MatchesController } from '../controllers';
import { MatchesService } from '../services';

const matchesRouter = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.get(
  '/',
  matchesController.getAll,
);

matchesRouter.post(
  '/',
  TokenHandler.checkToken,
  matchesController.createAnOnGoingMatch,
);

matchesRouter.patch(
  '/:id/finish',
  matchesController.finishAnOnGoingMatch,
);

export default matchesRouter;
