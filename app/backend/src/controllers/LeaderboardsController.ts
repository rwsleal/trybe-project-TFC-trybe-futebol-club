import { Request, Response } from 'express';
import { LeaderboardsService } from '../services';

export default class LeaderboardsController {
  constructor(private leaderboardsService: LeaderboardsService) {
    this.leaderboardsService = leaderboardsService;
  }

  getAll = async (req: Request, res: Response) => {
    const result = await this.leaderboardsService.getAll();

    return res.status(200).json(result);
  };
}
