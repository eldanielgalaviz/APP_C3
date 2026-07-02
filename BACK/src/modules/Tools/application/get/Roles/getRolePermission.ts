import { RolePermissionRepository } from "../../../domain/Repositories/Roles/ToolsToolsRolePermissionRepository";

export class getRolePermission {
  constructor(private repository: RolePermissionRepository) {}

  async run(): Promise<any> {
    return this.repository.getRolePermissionRepository();
  }
}