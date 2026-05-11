import { executeStoredProcedure } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { PedRepository } from "../../domain/Repositories/OriginationPedRepository";

export class PedRepositoryImpl implements PedRepository {
  
  async getPedRepository(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_ped_sig_by_pj', [idProject]);
    return result[0];
  }

  async setPedRepository(data: any, userId: number): Promise<any> {
    const params = [...Object.values(data), userId];
    const result = await executeStoredProcedure('sp_set_ped_sig', params);
    return result[0];
  }
  
}