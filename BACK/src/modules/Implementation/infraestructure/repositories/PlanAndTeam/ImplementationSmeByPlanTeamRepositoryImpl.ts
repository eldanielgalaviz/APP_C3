import { executeStoredProcedure } from "../../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { SmeByPlanTeamRepository } from "../../../domain/Repositories/PlanAndTeam/ImplementationSmeByPlanTeamRepository";

export class SmeByPlanTeamRepositoryImpl implements SmeByPlanTeamRepository {
  
  async getSmePlanTeamRepository(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_smes_by_plan_team_id', [idProject]);
    return result[0];
  }

  async setSmePlanTeamRepository(data: any): Promise<any> {
    const params = [...Object.values(data)];
    const result = await executeStoredProcedure('sp_set_smes_by_plan_team_id', params);
    return result[0];
  }
  
}