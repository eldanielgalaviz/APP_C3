import { PlanTeamRepository } from "../../../domain/Repositories/PlanAndTeam/ImplementationPlanTeamRepository";
import { PlanTeamRequest } from "../../../domain/Request/PlanAndTeam/ImplementationPlanTeamRequest";

export class setPlanTeam {
  constructor(private repository: PlanTeamRepository) {}

  async run(data: PlanTeamRequest, Iduser: number): Promise<any> {
    return this.repository.setPlanTeamRepository(data, Iduser);
  }
}