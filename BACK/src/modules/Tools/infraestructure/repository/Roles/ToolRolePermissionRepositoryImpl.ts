import { executeStoredProcedure, executeViews } from "../../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { RolePermissionRepository } from "../../../domain/Repositories/Roles/ToolsToolsRolePermissionRepository";
import { ToolsRolePermissionRequest } from "../../../domain/Request/Roles/ToolsRolePermissionRequest";

export class RolePermissionRepositoryImpl implements RolePermissionRepository {
    
  async getRolePermissionRepository(): Promise<any> {
    const result = await executeViews('vw_tool_role');
    return result[0];
  }

  async setRolePermissionRepository(data: ToolsRolePermissionRequest): Promise<any> {
    const params = [...Object.values(data)];
    const result = await executeStoredProcedure('sp_set_rol_rel_permission', params);
    return result[0];
  }
  
}