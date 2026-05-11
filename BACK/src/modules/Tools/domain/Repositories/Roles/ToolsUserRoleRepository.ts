import { ToolsUserRoleRequest } from "../../Request/Roles/ToolUserRoleRequest";

export interface UserRoleRepository {
  getUserRoleRepository(): Promise<ToolsUserRoleRequest>;
  setUserRoleRepository(role: ToolsUserRoleRequest): Promise<ToolsUserRoleRequest>;
}