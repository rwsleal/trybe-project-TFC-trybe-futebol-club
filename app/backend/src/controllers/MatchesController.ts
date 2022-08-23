import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService: MatchesService) {
    this.matchesService = matchesService;
  }

  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const result = await this.matchesService.getAllByInProgress(inProgress as string);

      return res.status(200).json(result);
    }

    const result = await this.matchesService.getAll();

    return res.status(200).json(result);
  };

  createAnOnGoingMatch = async (req: Request, res: Response) => {
    const result = await this.matchesService.createAnOnGoingMatch(req.body);

    return res.status(201).json(result);
  };
}
