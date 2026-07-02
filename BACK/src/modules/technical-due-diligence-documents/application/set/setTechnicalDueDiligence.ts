import { TechnicalDueDiligenceRepository } from "../../domain/Repositories/OriginationTDDdocumentRepository";
import { TechnicalDueDiligenceRequest } from "../../domain/Request/OriginationTDDdocumentRequest";

export class setTechnicalDueDiligence {
  constructor(private repository: TechnicalDueDiligenceRepository) { }

  async run(data: TechnicalDueDiligenceRequest, userId: number): Promise<any> {
    return this.repository.setTechnicalDueDiligence(data, userId);
  }
}