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
    const { homeTeam, awayTeam } = newMatchRequest;

    if (homeTeam === awayTeam) {
      throw new Error('401|It is not possible to create a match with two equal teams');
    }

    const allTeams = await Teams.findAll({ attributes: { exclude: ['teamName'] } });

    const checkHomeTeam = allTeams.find(({ id }) => id === homeTeam);
    const checkAwayTeam = allTeams.find(({ id }) => id === awayTeam);

    if (!checkHomeTeam || !checkAwayTeam) {
      throw new Error('404|There is no team with such id!');
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
