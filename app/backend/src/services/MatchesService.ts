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

  createAnOnGoingMatch = async (newMatchRequest: IMatch): Promise<IMatch | null> => {
    const { homeTeam, awayTeam } = newMatchRequest;

    if (homeTeam === awayTeam) {
      return null;
    }

    const newMatche = await Matches.create({
      ...newMatchRequest,
      inProgress: true,
    });

    return newMatche;
  };

  finishAnOnGoingMatch = async (id: string): Promise<void> => {
    await Matches.update(
      { inProgress: false },
      { where: { id } },
    );
  };
}
