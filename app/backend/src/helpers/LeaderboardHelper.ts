import { ILeaderboard, IMatchUpdate, IMatchInfo } from '../interfaces';

export default class LeaderboardHelper {
  static buildHomeTeamStats(name: string, teamInfo: IMatchUpdate[]): ILeaderboard {
    const totalVLD = this.getHomeVLD(teamInfo);
    const totalPoints = totalVLD.totalVictories * 3 + totalVLD.totalDraws;
    const totalGames = teamInfo.length;
    const goalsFavor = this.getGoals(teamInfo.map((match) => match.homeTeamGoals));
    const goalsOwn = this.getGoals(teamInfo.map((match) => match.awayTeamGoals));
    const goalsBalance = goalsFavor - goalsOwn;

    return {
      name,
      totalPoints,
      totalGames,
      totalVictories: totalVLD.totalVictories,
      totalDraws: totalVLD.totalDraws,
      totalLosses: totalVLD.totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
    };
  }

  static getGoals(goalsByMatch: number[]) {
    return goalsByMatch.reduce((acc: number, goals) => acc + goals);
  }

  static getHomeVLD(teamInfo: IMatchUpdate[]) {
    let totalVictories = 0;
    let totalLosses = 0;
    let totalDraws = 0;

    teamInfo.forEach((match) => {
      const { homeTeamGoals, awayTeamGoals } = match;
      if (homeTeamGoals > awayTeamGoals) totalVictories += 1;
      else if (homeTeamGoals < awayTeamGoals) totalLosses += 1;
      else totalDraws += 1;
    });

    return { totalVictories, totalLosses, totalDraws };
  }

  static sortTeamStats(teamInfo: ILeaderboard[]): ILeaderboard[] {
    return teamInfo.sort((a: ILeaderboard, b: ILeaderboard) => {
      if (a.totalPoints < b.totalPoints) { return 1; }
      if (a.totalPoints > b.totalPoints) { return -1; }
      if (a.totalVictories < b.totalVictories) { return 1; }
      if (a.totalVictories > b.totalVictories) { return -1; }
      if (a.goalsBalance < b.goalsBalance) { return 1; }
      if (a.goalsBalance > b.goalsBalance) { return -1; }
      if (a.goalsFavor < b.goalsFavor) { return 1; }
      if (a.goalsFavor > b.goalsFavor) { return -1; }
      if (a.goalsOwn < b.goalsOwn) { return 1; }
      if (a.goalsOwn > b.goalsOwn) { return -1; }
      return 0;
    });
  }

  static buildAwayTeamStats(name: string, teamInfo: IMatchUpdate[]): ILeaderboard {
    const totalVLD = this.getAwayVLD(teamInfo);
    const totalPoints = totalVLD.totalVictories * 3 + totalVLD.totalDraws;
    const totalGames = teamInfo.length;
    const goalsFavor = this.getGoals(teamInfo.map((match) => match.awayTeamGoals));
    const goalsOwn = this.getGoals(teamInfo.map((match) => match.homeTeamGoals));
    const goalsBalance = goalsFavor - goalsOwn;

    return {
      name,
      totalPoints,
      totalGames,
      totalVictories: totalVLD.totalVictories,
      totalDraws: totalVLD.totalDraws,
      totalLosses: totalVLD.totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
    };
  }

  static getAwayVLD(teamInfo: IMatchUpdate[]) {
    let totalVictories = 0;
    let totalLosses = 0;
    let totalDraws = 0;

    teamInfo.forEach((match) => {
      const { homeTeamGoals, awayTeamGoals } = match;
      if (homeTeamGoals < awayTeamGoals) totalVictories += 1;
      else if (homeTeamGoals > awayTeamGoals) totalLosses += 1;
      else totalDraws += 1;
    });

    return { totalVictories, totalLosses, totalDraws };
  }

  static buildTeamStats(name: string, teamInfo: IMatchInfo[]): ILeaderboard {
    const totalVLDAndGoals = this.getVLDAndGoals(name, teamInfo);
    const totalPoints = totalVLDAndGoals.totalVictories * 3 + totalVLDAndGoals.totalDraws;
    const totalGames = teamInfo.length;

    return {
      name,
      totalPoints,
      totalGames,
      totalVictories: totalVLDAndGoals.totalVictories,
      totalDraws: totalVLDAndGoals.totalDraws,
      totalLosses: totalVLDAndGoals.totalLosses,
      goalsFavor: totalVLDAndGoals.goalsFavor,
      goalsOwn: totalVLDAndGoals.goalsOwn,
      goalsBalance: totalVLDAndGoals.goalsFavor - totalVLDAndGoals.goalsOwn,
      efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
    };
  }

  static getVLDAndGoals(name: string, teamInfo: IMatchInfo[]) {
    const whenHome = teamInfo.filter(({ teamHome }) => teamHome.teamName === name);
    const whenHomeVLD = this.getHomeVLD(whenHome);
    const whenAway = teamInfo.filter(({ teamAway }) => teamAway.teamName === name);
    const whenAwayVLD = this.getAwayVLD(whenAway);
    const allGoals = this.getAllGoals(whenHome, whenAway);

    return {
      totalVictories: whenHomeVLD.totalVictories + whenAwayVLD.totalVictories,
      totalLosses: whenHomeVLD.totalLosses + whenAwayVLD.totalLosses,
      totalDraws: whenHomeVLD.totalDraws + whenAwayVLD.totalDraws,
      ...allGoals,
    };
  }

  static getAllGoals(whenHome: IMatchInfo[], whenAway: IMatchInfo[]) {
    const homeGoalsFavor = this.getGoals(whenHome.map((match) => match.homeTeamGoals));
    const homeGoalsOwn = this.getGoals(whenHome.map((match) => match.awayTeamGoals));

    const awayGoalsFavor = this.getGoals(whenAway.map((match) => match.awayTeamGoals));
    const awayGoalsOwn = this.getGoals(whenAway.map((match) => match.homeTeamGoals));

    const goalsFavor = homeGoalsFavor + awayGoalsFavor;
    const goalsOwn = homeGoalsOwn + awayGoalsOwn;

    return {
      goalsFavor,
      goalsOwn,
    };
  }
}
