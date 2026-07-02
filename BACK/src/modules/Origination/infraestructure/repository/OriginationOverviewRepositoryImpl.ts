import { executeStoredProcedure } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { OverviewRepository } from "../../domain/Repositories/OriginationOverviewRepository";

export class OverviewRepositoryImpl implements OverviewRepository {

  async getOverviewRepository(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_overview', [idProject]);
    return result[0];
  }
}