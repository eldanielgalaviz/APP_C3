import { ToolsRolePermissionRequest } from "../../Request/Roles/ToolsRolePermissionRequest";

export interface RolePermissionRepository {
  getRolePermissionRepository(): Promise<ToolsRolePermissionRequest>;
  setRolePermissionRepository(menu: ToolsRolePermissionRequest): Promise<ToolsRolePermissionRequest>;
}