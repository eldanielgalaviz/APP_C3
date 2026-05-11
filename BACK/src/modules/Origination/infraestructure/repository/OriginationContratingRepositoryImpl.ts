import { executeStoredProcedure } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { ContratingRepository } from "../../domain/Repositories/OriginationContratingRepository";

export class ContratingRepositoryImpl implements ContratingRepository {

  async getContratingRepository(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_contrating', [idProject]);
    return result[0];
  }

  async setContratingRepository(data: any, userId: number): Promise<any> {
    const params = [...Object.values(data), userId];
    const result = await executeStoredProcedure('sp_set_contrating', params);
    return result[0];
  }
}