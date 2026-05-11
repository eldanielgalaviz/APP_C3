import { TeamAndPlansRepository } from "../../../domain/Repositories/OriginationTeamAndPlanRepository";
import { TeamAndPlansRequest } from "../../../domain/Request/OriginationTeamAndPlansRequest";

export class setTeamAndPlans {
  constructor(private repository: TeamAndPlansRepository) {}

  async run(data: TeamAndPlansRequest, userId: number): Promise<any> {
    return this.repository.setTeamAndPlansRepository(data, userId);
  }
}
