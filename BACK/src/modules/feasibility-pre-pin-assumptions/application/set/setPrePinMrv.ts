import { PrePinAssumptionsRepository } from "../../domain/Repositories/OriginationPrePinoAssumptionsRepository";
import { PrePinMrvRequest } from "../../domain/Request/OriginationPreAssumptionsRequest";

export class setPrePinMrv {
  constructor(private repository: PrePinAssumptionsRepository) {}

  async run(data: PrePinMrvRequest, userId: number): Promise<any> {
    return this.repository.setPrePinMrvRepository(data, userId);
  }
}