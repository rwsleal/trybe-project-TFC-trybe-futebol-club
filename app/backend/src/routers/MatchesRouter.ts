import { Router } from 'express';
import { MatchesController } from '../controllers';
import { MatchesService } from '../services';

const matchesRouter = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.get(
  '/',
  matchesController.getAll,
);

export default matchesRouter;
