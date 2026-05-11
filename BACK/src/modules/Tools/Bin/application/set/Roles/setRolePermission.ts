import { RolePermissionRepository } from "../../../../domain/Repositories/Roles/ToolsToolsRolePermissionRepository";
import { ToolsRolePermissionRequest } from "../../../../domain/Request/Roles/ToolsRolePermissionRequest";

export class setRolePermission {
  constructor(private repository: RolePermissionRepository) { }

  async run(data: ToolsRolePermissionRequest): Promise<ToolsRolePermissionRequest> {
    return this.repository.setRolePermissionRepository(data);
  }
}