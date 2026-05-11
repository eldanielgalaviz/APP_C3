import { ImplementationPlanTeamCatalogRepository } from "../../../../../domain/Repositories/PlanAndTeam/ImplementationPlanTeamCatalog";

export class getSmes {
  constructor(private repository: ImplementationPlanTeamCatalogRepository) {}

  async run(): Promise<any> {
    return this.repository.getSmes();
  }
}