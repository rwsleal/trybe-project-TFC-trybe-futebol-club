import Matches from '../database/models/Matches';

export interface IMatche extends Matches {
  teamHome?: { teamName: string };
  teamAway?: { teamName: string };
}
