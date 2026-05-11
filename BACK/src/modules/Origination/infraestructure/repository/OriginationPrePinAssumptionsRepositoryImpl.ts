import { executeStoredProcedure } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { PrePinAssumptionsRepository } from "../../domain/Repositories/OriginationPrePinoAssumptionsRepository";

export class PrePinAssumptionsRepositoryImpl implements PrePinAssumptionsRepository {

  async getPrePinAssumptionsRepository(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_pre_pin_assumptions', [idProject]);
    return result[0];
  }

  async setPrePinAssumptionsRepository(data: any, userId: number): Promise<any> {
    const params = [...Object.values(data), userId];
    const result = await executeStoredProcedure('sp_set_pre_pin_assumptions', params);
    return result[0];
  }
} 