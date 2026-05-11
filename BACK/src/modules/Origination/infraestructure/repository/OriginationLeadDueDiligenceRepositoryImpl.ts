import { executeStoredProcedure } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { LeadDueDiligenceRepository } from "../../domain/Repositories/OriginationLegalDueDiligenceRepository";

export class LeadDueDiligenceRepositoryImpl implements LeadDueDiligenceRepository {

  async getLeadDueDiligenceRepository(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_legal_due_diligence', [idProject]);
    return result[0];
  } 

  async setLeadDueDiligenceRepository(data: any, userId: number): Promise<any> {
    const params = [...Object.values(data), userId];
    const result = await executeStoredProcedure('sp_set_legal_due_diligence', params);
    return result[0];
  } 
}