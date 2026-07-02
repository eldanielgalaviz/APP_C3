import { OverviewRepository } from "../../domain/Repositories/OriginationOverviewRepository";

export class getOverview {
  constructor(private repository: OverviewRepository) {}

  async run(idProject: number): Promise<any> {
    return this.repository.getOverviewRepository(idProject);
  }
}