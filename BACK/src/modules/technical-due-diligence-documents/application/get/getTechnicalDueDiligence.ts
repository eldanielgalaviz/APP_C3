import { TechnicalDueDiligenceRepository } from "../../domain/Repositories/OriginationTDDdocumentRepository";

export class getTechnicalDueDiligence {
  constructor(private repository: TechnicalDueDiligenceRepository) { }

  async run(projectId: number): Promise<any> {
    return this.repository.getTechnicalDueDiligence(projectId);
  }
}