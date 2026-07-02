import { PermissionUserRepository } from "../../../domain/Repositories/Roles/ToolsPermissionUserRepository";
import { ToolsPermissionUserRequest } from "../../../domain/Request/Roles/ToolsPermissionUserRequest";

export class setPermissionUser {
  constructor(private repository: PermissionUserRepository) {}

  async run(data: ToolsPermissionUserRequest, userId: number): Promise<any> {
    return this.repository.setPermissionUserRepository(data, userId);
  }
}