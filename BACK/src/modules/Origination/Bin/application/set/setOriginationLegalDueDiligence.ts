import { LeadDueDiligenceRepository } from "../../../domain/Repositories/OriginationLegalDueDiligenceRepository";

export class setLegalDueDiligence {
  constructor(private repository: LeadDueDiligenceRepository) { }

  async run(data: any, userId: number): Promise<any> {
    return this.repository.setLeadDueDiligenceRepository(data, userId);
  } 
}