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

    if (!result) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    return res.status(201).json(result);
  };

  finishAnOnGoingMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesService.finishAnOnGoingMatch(id);

    return res.status(200).json({ message: 'Finished' });
  };
}
