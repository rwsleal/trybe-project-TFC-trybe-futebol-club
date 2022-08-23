import { IMatch } from '../interfaces';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class MatchesServices {
  getAll = async (): Promise<IMatch[]> => {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches as IMatch[];
  };

  getAllByInProgress = async (query: string): Promise<IMatch[]> => {
    const matches = await Matches.findAll({
      where: { inProgress: JSON.parse(query) },
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches as IMatch[];
  };

  createAnOnGoingMatch = async (newMatchRequest: IMatch): Promise<IMatch> => {
    const newMatche = await Matches.create({
      ...newMatchRequest,
      inProgress: true,
    });

    return newMatche;
  };
}
