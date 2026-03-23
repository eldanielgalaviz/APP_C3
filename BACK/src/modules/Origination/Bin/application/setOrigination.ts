import { OriginationRepository } from '../../domain/OriginationRepository';
import { OriginationRequest } from '../../domain/OriginationRequest';

export class setOrigination {
  constructor(private repository: OriginationRepository) {}

  async run(origination: OriginationRequest): Promise<OriginationRequest> {
    return this.repository.setOriginationRepository(origination);
  }
}