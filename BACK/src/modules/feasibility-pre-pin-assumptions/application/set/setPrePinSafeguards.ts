import { PrePinAssumptionsRepository } from "../../domain/Repositories/OriginationPrePinoAssumptionsRepository";
import { PrePinSafeguardsRequest } from "../../domain/Request/OriginationPreAssumptionsRequest";

export class setPrePinSafeguards {
  constructor(private repository: PrePinAssumptionsRepository) {}

  async run(data: PrePinSafeguardsRequest, userId: number): Promise<any> {
    return this.repository.setPrePinSafeguardsRepository(data, userId);
  }
}