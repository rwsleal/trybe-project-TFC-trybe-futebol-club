import { Request, Response } from 'express';
import { TeamsService } from '../services';

export default class TeamsController {
  constructor(private teamsService: TeamsService) {
    this.teamsService = teamsService;
  }

  getAll = async (req: Request, res: Response) => {
    const result = await this.teamsService.getAll();

    return res.status(200).json(result);
  };
}
