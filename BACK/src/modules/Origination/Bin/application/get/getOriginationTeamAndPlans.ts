import { TeamAndPlansRepository } from "../../../domain/Repositories/OriginationTeamAndPlanRepository";

export class getTeamAndPlans {
  constructor(private repository: TeamAndPlansRepository) {}

  async run(idProject: number): Promise<any> {
    return this.repository.getTeamAndPlansRepository(idProject);
  }
}