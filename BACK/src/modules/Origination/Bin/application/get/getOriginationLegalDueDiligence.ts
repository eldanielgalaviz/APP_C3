import { LeadDueDiligenceRepository } from "../../../domain/Repositories/OriginationLegalDueDiligenceRepository";

export class getLegalDueDiligence {
  constructor(private repository: LeadDueDiligenceRepository) {}

  async run(idProject: number): Promise<any> {
    return this.repository.getLeadDueDiligenceRepository(idProject); 
  }
}