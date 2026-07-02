import { UserRoleRepository } from "../../../domain/Repositories/Roles/ToolsUserRoleRepository";
import { ToolsUserRoleRequest } from "../../../domain/Request/Roles/ToolUserRoleRequest";

export class setUserRole {
  constructor(private repository: UserRoleRepository) { }

  async run(data: ToolsUserRoleRequest): Promise<ToolsUserRoleRequest> {
    return this.repository.setUserRoleRepository(data);
  }
}