export interface ProjectApprovalRepository {
  getProjectApprovalRepository(idProject: number): Promise<any>;
  setProjectApprovalRepository(data: any, userId: number): Promise<any>;
}