import { SmeByPlanTeamRepository } from "../../../../domain/Repositories/PlanAndTeam/ImplementationSmeByPlanTeamRepository";

export class getSmeByPlanTeam {
  constructor(private repository: SmeByPlanTeamRepository) {}

  async run(idProject: number): Promise<any> {
    return this.repository.getSmePlanTeamRepository(idProject);
  }
}