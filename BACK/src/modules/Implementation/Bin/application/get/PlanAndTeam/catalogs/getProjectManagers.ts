import { ImplementationPlanTeamCatalogRepository } from "../../../../../domain/Repositories/PlanAndTeam/ImplementationPlanTeamCatalog";

export class getProjectManagers {
  constructor(private repository: ImplementationPlanTeamCatalogRepository) {}

  async run(): Promise<any> {
    return this.repository.getProjectManagers();
  }
}