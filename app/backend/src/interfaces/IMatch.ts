import Matches from '../database/models/Matches';

export interface IMatch extends Matches {
  teamHome?: { teamName: string };
  teamAway?: { teamName: string };
}

export interface IMatchUpdate extends IMatch{
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatchInfo extends Matches {
  teamHome: { teamName: string },
  teamAway: { teamName: string },
}
