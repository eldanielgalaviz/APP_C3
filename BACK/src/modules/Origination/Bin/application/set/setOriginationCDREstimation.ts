import { CDRRepository } from "../../../domain/Repositories/OriginationCDRRepository";

export class setCDREstimation {
  constructor(private repository: CDRRepository) { }

  async run(data: any, userId: number): Promise<any> {
    return this.repository.setCDRRepository(data, userId);
  }
}