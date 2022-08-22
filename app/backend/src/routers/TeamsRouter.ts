import { Router } from 'express';
import { TeamsService } from '../services';
import { TeamsController } from '../controllers';

const teamsRouter = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

teamsRouter.get(
  '/',
  teamsController.getAll,
);

export default teamsRouter;
