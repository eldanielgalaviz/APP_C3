import { CDRRepository } from "../../domain/Repositories/OriginationCDRRepository";

export class getCDREstimation {
  constructor(private repository: CDRRepository) {}

  async run(idProject: number): Promise<any> {
    return this.repository.getCDRRepository(idProject);
  }
}
