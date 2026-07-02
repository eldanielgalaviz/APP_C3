import { TransactionApprovalRepository } from "../../domain/Repositories/OriginationTransactionApprovalRepository";

export class setTransactionApproval {
  constructor(private repository: TransactionApprovalRepository) { }

  async run(data: any, userId: number): Promise<any> {
    return this.repository.setTransactionApprovalRepository(data, userId);
  } 
}