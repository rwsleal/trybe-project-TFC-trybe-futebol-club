import { IMatche } from '../interfaces';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class MatchesServices {
  getAll = async (): Promise<IMatche[]> => {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches as IMatche[];
  };

  getAllByInProgress = async (query: string): Promise<IMatche[]> => {
    const matches = await Matches.findAll({
      where: { inProgress: JSON.parse(query) },
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches as IMatche[];
  };
}
