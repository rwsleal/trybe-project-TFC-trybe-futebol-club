import { IMatche } from '../interfaces';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
// import { IMatche } from '../interfaces';

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
}
