import { OriginationRepository } from "../../../domain/Repositories/OriginationRepository";
import { OriginationRequest } from "../../../domain/Request/OriginationRequest";

export class setOrigination {
  constructor(private repository: OriginationRepository) {}

  async run(origination: OriginationRequest, userId: number): Promise<OriginationRequest> {
    return this.repository.setOriginationRepository(origination, userId);
  }
}

