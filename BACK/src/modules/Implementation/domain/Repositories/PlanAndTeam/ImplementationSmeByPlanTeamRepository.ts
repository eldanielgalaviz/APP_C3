import { SmeByPlanTeamRequest } from "../../Request/PlanAndTeam/ImplementationSmeByPlanTeamRequest";


export interface SmeByPlanTeamRepository {
  getSmePlanTeamRepository(idPlanTeam: number): Promise<any>;
  setSmePlanTeamRepository(data: SmeByPlanTeamRequest): Promise<any>;
}