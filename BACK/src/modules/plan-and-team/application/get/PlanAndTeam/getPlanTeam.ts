import { PlanTeamRepository } from "../../../domain/Repositories/PlanAndTeam/ImplementationPlanTeamRepository";

export class getPlanTeam {
  constructor(private repository: PlanTeamRepository) {}

  async run(idProject: number): Promise<any> {
    return this.repository.getPlanTeamRepository(idProject);
  }
}