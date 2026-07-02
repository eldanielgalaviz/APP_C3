import { TransactionApprovalRepository } from "../../domain/Repositories/OriginationTransactionApprovalRepository";

export class getTransactionApproval {
  constructor(private repository: TransactionApprovalRepository) {}

  async run(idProject: number): Promise<any> {
    return this.repository.getTransactionApprovalRepository(idProject);
  }
}