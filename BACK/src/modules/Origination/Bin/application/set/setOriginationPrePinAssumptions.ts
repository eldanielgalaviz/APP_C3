import { PrePinAssumptionsRepository } from "../../../domain/Repositories/OriginationPrePinoAssumptionsRepository";

export class setPrePinAssumptions {
  constructor(private repository: PrePinAssumptionsRepository) {}
  async run(data: any, userId: number): Promise<any> {
    return this.repository.setPrePinAssumptionsRepository(data, userId);
  }
}