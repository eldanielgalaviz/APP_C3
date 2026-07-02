import { ActivityAreaRepository } from "../../domain/Repositories/OriginationActivityAreaRepository";

export class getActivityArea {
  constructor(private repository: ActivityAreaRepository) {}

  async run(idProject: number): Promise<any> {
    return this.repository.getActivityAreaRepository(idProject);
  }
}