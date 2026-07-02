import { executeStoredProcedure } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { CDRRepository } from "../../domain/Repositories/OriginationCDRRepository";

export class CDRRepositoryEstimationImpl implements CDRRepository {

  async getCDRRepository(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_CDR_estimation_by_pj', [idProject]);
    return result[0];
  }

  async setCDRRepository(data: any, userId: number): Promise<any> {
    const params = [...Object.values(data), userId];
    const result = await executeStoredProcedure('sp_set_CDR_estimation', params);
    return result[0];
  }
  
}