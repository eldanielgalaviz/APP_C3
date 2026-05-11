import { executeStoredProcedure } from "../../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { PlanTeamRepository } from "../../../domain/Repositories/PlanAndTeam/ImplementationPlanTeamRepository";

export class PlanTeamRepositoryImpl implements PlanTeamRepository {
  
  async getPlanTeamRepository(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_Plan_Team_By_Project', [idProject]);
    return result[0];
  }

  async setPlanTeamRepository(data: any, userId: number): Promise<any> {
    const params = [...Object.values(data), userId];
    const result = await executeStoredProcedure('sp_set_plan_team_by_project', params);
    return result[0];
  }
  
}