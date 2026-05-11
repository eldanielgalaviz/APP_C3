export interface TransactionApprovalRepository {
  getTransactionApprovalRepository(idProject: number): Promise<any>;
  setTransactionApprovalRepository(data: any, userId: number): Promise<any>;
}