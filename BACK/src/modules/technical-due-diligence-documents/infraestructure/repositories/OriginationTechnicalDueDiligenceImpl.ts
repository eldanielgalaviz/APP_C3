import { executeStoredProcedure } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { TechnicalDueDiligenceRepository } from "../../domain/Repositories/OriginationTDDdocumentRepository";


export class TechnicalDueDiligenceRepositoryImpl implements TechnicalDueDiligenceRepository {

  async getTechnicalDueDiligence(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_tdd_documents_by_project', [idProject]);
    return result[0];
  }

  async setTechnicalDueDiligence(data: any, userId: number): Promise<any> {
    const params = [...Object.values(data), userId];
    const result = await executeStoredProcedure('sp_set_tdd_documents', params);
    return result[0];
  }
} 