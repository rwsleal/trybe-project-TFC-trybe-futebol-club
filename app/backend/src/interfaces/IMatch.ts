import Matches from '../database/models/Matches';

export interface IMatch extends Matches {
  teamHome?: { teamName: string };
  teamAway?: { teamName: string };
}

export interface IMatchUpdate {
  homeTeamGoals: number,
  awayTeamGoals: number,
}
