import { ILeaderboard } from '../interfaces';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { LeaderboardHelper } from '../helpers';

export default class LeaderboardsService {
  getAll = async (): Promise<ILeaderboard[]> => {
    const allTeams = await Teams.findAll();

    // const matches = await Matches.findAll({
    //   include: [
    //     { model: Teams, as: 'teamHome', attributes: ['teamName'] },
    //     { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    //   ],
    // });

    const teamInfo = await Promise
      .all(allTeams.map(async ({ id, teamName }): Promise<ILeaderboard> => {
        const whenHomeTeam = await Matches.findAll({
          attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
          where: { homeTeam: id, inProgress: false },
        });
        // const whenAwayTeam = await Matches.findAll({
        //   attributes: { exclude: ['homeTeam', 'homeTeamGoals', 'inProgress'] },
        //   where: { homeTeam: id },
        // });
        const teamStats = LeaderboardHelper.buildTeamStats(teamName, whenHomeTeam);

        return teamStats;
      }));

    const teamInfoSorted = await LeaderboardHelper.sortTeamStats(teamInfo);

    return teamInfoSorted;
  };
}
