import { executeStoredProcedure } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { TeamAndPlansRepository } from "../../domain/Repositories/OriginationTeamAndPlanRepository";
import { TeamAndPlansRequest } from "../../domain/Request/OriginationTeamAndPlansRequest";

export class TeamAndPlansRepositoryImpl implements TeamAndPlansRepository {

  async getTeamAndPlansRepository(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_team_and_plans', [idProject]);
    return result[0];
  }

  async setTeamAndPlansRepository(data: TeamAndPlansRequest, userId: number): Promise<any> {
    const params = [...Object.values(data), userId];
    const result = await executeStoredProcedure('sp_set_team_and_plans', params);
    return result[0];
  }
}