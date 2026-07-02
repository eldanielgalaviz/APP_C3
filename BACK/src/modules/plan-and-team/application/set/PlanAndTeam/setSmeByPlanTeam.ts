import { SmeByPlanTeamRepository } from "../../../domain/Repositories/PlanAndTeam/ImplementationSmeByPlanTeamRepository";
import { SmeByPlanTeamRequest } from "../../../domain/Request/PlanAndTeam/ImplementationSmeByPlanTeamRequest";

export class setSmeByPlanTeam {
  constructor(private repository: SmeByPlanTeamRepository) {}

  async run(data: SmeByPlanTeamRequest): Promise<any> {
    return this.repository.setSmePlanTeamRepository(data);
  }
}