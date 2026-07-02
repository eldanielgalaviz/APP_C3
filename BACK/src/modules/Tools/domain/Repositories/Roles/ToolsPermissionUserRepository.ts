import { ToolsPermissionUserRequest } from "../../Request/Roles/ToolsPermissionUserRequest";

export interface PermissionUserRepository {
  getPermissionUserRepository(): Promise<any>;
  setPermissionUserRepository(data: ToolsPermissionUserRequest, userId: number): Promise<any>;
}