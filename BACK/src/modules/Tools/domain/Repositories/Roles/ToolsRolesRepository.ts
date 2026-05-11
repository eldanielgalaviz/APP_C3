import { ToolsRoleRequest } from "../../Request/Roles/ToolsRolesRequest";

export interface RoleRepository {
  getRoleRepository(): Promise<ToolsRoleRequest>;
  setRoleRepository(menu: ToolsRoleRequest): Promise<ToolsRoleRequest>;
}