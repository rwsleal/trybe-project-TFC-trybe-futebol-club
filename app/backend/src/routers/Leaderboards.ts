import { Router } from 'express';
import { LeaderboardsController } from '../controllers';
import { LeaderboardsService } from '../services';

const leaderboardsRouter = Router();

const leaderboardsService = new LeaderboardsService();
const matchesController = new LeaderboardsController(leaderboardsService);

leaderboardsRouter.get(
  '/home',
  matchesController.getHomeTeamsData,
);

leaderboardsRouter.get(
  '/away',
  matchesController.getAwayTeamsData,
);

export default leaderboardsRouter;
