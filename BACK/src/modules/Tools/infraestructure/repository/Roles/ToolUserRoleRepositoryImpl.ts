import { executeStoredProcedure, executeViews } from "../../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { UserRoleRepository } from "../../../domain/Repositories/Roles/ToolsUserRoleRepository";
import { ToolsUserRoleRequest } from "../../../domain/Request/Roles/ToolUserRoleRequest";

export class UserRoleRepositoryImpl implements UserRoleRepository {
    
  async getUserRoleRepository(): Promise<any> {
    const result = await executeViews('vw_tool_user_role');
    return result[0];
  }

  async setUserRoleRepository(data: ToolsUserRoleRequest): Promise<any> {
    const params = [...Object.values(data)];
    const result = await executeStoredProcedure('sp_set_rel_user_role', params);
    return result[0];
  }
  
}