import { executeStoredProcedure } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { ActivityAreaRepository } from "../../domain/Repositories/OriginationActivityAreaRepository";

export class ActivityAreaRepositoryImpl implements ActivityAreaRepository {

  async getActivityAreaRepository(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_activity_area', [idProject]);
    return result[0];
  }

  async setActivityAreaRepository(data: any, userId: number): Promise<any> {
    const params = [...Object.values(data), userId];
    const result = await executeStoredProcedure('sp_set_activity_area', params);
    return result[0];
  }
}