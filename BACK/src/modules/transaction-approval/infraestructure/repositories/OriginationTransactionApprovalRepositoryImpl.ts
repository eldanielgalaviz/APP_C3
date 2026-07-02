import { executeStoredProcedure } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { TransactionApprovalRepository } from "../../domain/Repositories/OriginationTransactionApprovalRepository";

export class TransactionApprovalRepositoryImpl implements TransactionApprovalRepository {

  async getTransactionApprovalRepository(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_transaction_approval', [idProject]);
    return result[0];
  }

  async setTransactionApprovalRepository(data: any, userId: number): Promise<any> {
    const params = [...Object.values(data), userId];
    const result = await executeStoredProcedure('sp_set_transaction_approval', params);
    return result[0];
  }
}