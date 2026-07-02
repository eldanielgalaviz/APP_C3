import { ProjectAreasRepository } from "../../domain/Repositories/OriginationProjectAreasRepository";
import { ProjectAreasRequest } from "../../domain/Request/OriginationProjectAreasRequest";

export class setProjectAreas {
  constructor(private repository: ProjectAreasRepository) {}
  async run(data: ProjectAreasRequest, userId: number): Promise<any> {
    return this.repository.setProjectAreasRepository(data, userId);
  }
}