import { executeStoredProcedure } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { CbaImportRepository } from "../../domain/Repositories/OriginationCbaImportRepository";

export class CbaImportRepositoryImpl implements CbaImportRepository {

  async getcbaImportRepository(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_CBA_all_data_by_pj', [idProject]);
    return result[0];
  }

  async setcbaImportRepository(data: any, userId: number): Promise<any> {
    const params = [...Object.values(data)];
    const result = await executeStoredProcedure('sp_set_CBA_all_imports', params);
    return result[0];
  }
}