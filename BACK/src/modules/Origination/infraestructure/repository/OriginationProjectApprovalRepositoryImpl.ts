import { executeStoredProcedure } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { ProjectApprovalRepository } from "../../domain/Repositories/OriginationProjectApprovalRepository";

export class ProjectApprovalRepositoryImpl implements ProjectApprovalRepository {

  async getProjectApprovalRepository(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_project_approval', [idProject]);
    return result[0];
  } 
  async setProjectApprovalRepository(data: any, userId: number): Promise<any> {
    const params = [...Object.values(data), userId];
    const result = await executeStoredProcedure('sp_set_project_approval', params);
    return result[0];
  } 
}