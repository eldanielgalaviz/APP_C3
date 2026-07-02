import { PrePinAssumptionsRepository } from "../../domain/Repositories/OriginationPrePinoAssumptionsRepository";
import { PrePinOriginationRequest } from "../../domain/Request/OriginationPreAssumptionsRequest";

export class setPrePinOrigination {
  constructor(private repository: PrePinAssumptionsRepository) {}

  async run(data: PrePinOriginationRequest, userId: number): Promise<any> {
    return this.repository.setPrePinOriginationRepository(data, userId);
  }
}