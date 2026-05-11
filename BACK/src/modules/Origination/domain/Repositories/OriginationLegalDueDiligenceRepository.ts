export interface LeadDueDiligenceRepository {
  getLeadDueDiligenceRepository(idProject: number): Promise<any>;
  setLeadDueDiligenceRepository(data: any, userId: number): Promise<any>;
}