import { ContratingRepository } from "../../../domain/Repositories/OriginationContratingRepository";

export class setContrating {
  constructor(private repository: ContratingRepository) { }

  async run(data: any, userId: number): Promise<any> {
    return this.repository.setContratingRepository(data, userId);
  }
}