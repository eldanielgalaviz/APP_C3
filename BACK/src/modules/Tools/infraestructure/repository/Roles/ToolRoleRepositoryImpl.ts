import { executeStoredProcedure, executeViews } from "../../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { RoleRepository } from "../../../domain/Repositories/Roles/ToolsRolesRepository";
import { ToolsRoleRequest } from "../../../domain/Request/Roles/ToolsRolesRequest";

export class RoleRepositoryImpl implements RoleRepository {
    
  async getRoleRepository(): Promise<any> {
    const result = await executeViews('vw_tool_role');
    return result[0];
  }

  async setRoleRepository(data: ToolsRoleRequest): Promise<any> {
    const params = [...Object.values(data)];
    const result = await executeStoredProcedure('sp_set_rol', params);
    return result[0];
  }
  
}