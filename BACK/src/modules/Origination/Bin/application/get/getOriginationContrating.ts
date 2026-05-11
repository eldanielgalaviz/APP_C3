import { ContratingRepository } from "../../../domain/Repositories/OriginationContratingRepository";

export class getContrating {
  constructor(private repository: ContratingRepository) {}

  async run(idProject: number): Promise<any> {
    return this.repository.getContratingRepository(idProject);
  }
}