import { OriginationRepository } from '../../domain/OriginationRepository';
import { OriginationRequest } from '../../domain/OriginationRequest';

export class getOrigination {
  constructor(private repository: OriginationRepository) {}

  async run(origination: number): Promise<OriginationRequest> {
    return this.repository.getOriginationRepository(origination);
  }
}