import Teams from '../database/models/Teams';
import { ITeam } from '../interfaces';

export default class TeamsService {
  getAll = async (): Promise<ITeam[]> => {
    const teams = await Teams.findAll();

    return teams;
  };

  getById = async (id: string): Promise<ITeam | null> => {
    const team = await Teams.findByPk(id);

    return team;
  };
}
