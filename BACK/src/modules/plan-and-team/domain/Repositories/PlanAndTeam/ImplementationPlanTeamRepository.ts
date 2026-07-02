import { PlanTeamRequest } from "../../Request/PlanAndTeam/ImplementationPlanTeamRequest";

export interface PlanTeamRepository {
  getPlanTeamRepository(idPlanTeam: number): Promise<any>;
  setPlanTeamRepository(data: PlanTeamRequest, userId: number): Promise<any>;
}
