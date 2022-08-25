import { Request, Response } from 'express';
import { LeaderboardsService } from '../services';

export default class LeaderboardsController {
  constructor(private leaderboardsService: LeaderboardsService) {
    this.leaderboardsService = leaderboardsService;
  }

  getHomeTeamsData = async (req: Request, res: Response) => {
    const result = await this.leaderboardsService.getHomeTeamsData();

    return res.status(200).json(result);
  };

  getAwayTeamsData = async (req: Request, res: Response) => {
    const result = await this.leaderboardsService.getAwayTeamsData();

    return res.status(200).json(result);
  };
}
