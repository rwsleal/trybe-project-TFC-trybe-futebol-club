import { Op } from 'sequelize';
import { ILeaderboard, IMatchInfo } from '../interfaces';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { LeaderboardHelper } from '../helpers';

export default class LeaderboardsService {
  getHomeTeamsData = async (): Promise<ILeaderboard[]> => {
    const allTeams = await Teams.findAll();
    const teamInfo = await Promise
      .all(allTeams.map(async ({ id, teamName }): Promise<ILeaderboard> => {
        const whenHomeTeam = await Matches.findAll({
          raw: true,
          attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
          where: { homeTeam: id, inProgress: false },
        });
        const teamStats = LeaderboardHelper.buildHomeTeamStats(teamName, whenHomeTeam);

        return teamStats;
      }));

    const teamsInfoSorted = await LeaderboardHelper.sortTeamStats(teamInfo);

    return teamsInfoSorted;
  };

  getAwayTeamsData = async (): Promise<ILeaderboard[]> => {
    const allTeams = await Teams.findAll();
    const teamInfo = await Promise
      .all(allTeams.map(async ({ id, teamName }): Promise<ILeaderboard> => {
        const whenAwayTeam = await Matches.findAll({
          attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
          where: { awayTeam: id, inProgress: false },
        });
        const teamStats = LeaderboardHelper.buildAwayTeamStats(teamName, whenAwayTeam);

        return teamStats;
      }));

    const teamsInfoSorted = LeaderboardHelper.sortTeamStats(teamInfo);

    return teamsInfoSorted;
  };

  getGeneralTeamsData = async (): Promise<ILeaderboard[]> => {
    const allTeams = await Teams.findAll();
    const teamInfo = await Promise
      .all(allTeams.map(async ({ id, teamName }): Promise<ILeaderboard> => {
        const allTeamMatches = await this.getAllTeamMatches(id);
        const teamStats = LeaderboardHelper.buildTeamStats(teamName, allTeamMatches);
        return teamStats;
      }));

    const teamsInfoSorted = LeaderboardHelper.sortTeamStats(teamInfo);

    return teamsInfoSorted;
  };

  private getAllTeamMatches = async (id: number): Promise<IMatchInfo[]> => {
    const allTeamMatches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
      attributes: { exclude: ['id', 'inProgress', 'homeTeam', 'awayTeam'] },
      where: { inProgress: false, [Op.or]: [{ homeTeam: id }, { awayTeam: id }] },
    });

    return allTeamMatches as IMatchInfo[];
  };
}
