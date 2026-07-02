import { executeStoredProcedure, executeViews } from "../../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { PermissionUserRepository } from "../../../domain/Repositories/Roles/ToolsPermissionUserRepository";
import { ToolsPermissionUserRequest } from "../../../domain/Request/Roles/ToolsPermissionUserRequest";

export class PermissionUserRepositoryImpl implements PermissionUserRepository {

  async getPermissionUserRepository(): Promise<any> {
    const result = await executeViews('ct_permissions_user');
    return result[0];
  }

  async setPermissionUserRepository(data: ToolsPermissionUserRequest, userId: number): Promise<any> {
    const params = [...Object.values(data), userId];
    const result = await executeStoredProcedure('sp_set_permissions_user', params);
    return result[0];
  }
}