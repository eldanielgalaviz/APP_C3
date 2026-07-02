import { ProjectAreasRepository } from "../../domain/Repositories/OriginationProjectAreasRepository";

export class getProjectAreas {
  constructor(private repository: ProjectAreasRepository) {}

  async run(idProject: number): Promise<any> {
    return this.repository.getProjectAreasRepository(idProject);
  }
}
