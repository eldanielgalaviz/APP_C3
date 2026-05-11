import { RoleRepository } from "../../../../domain/Repositories/Roles/ToolsRolesRepository";
import { ToolsRoleRequest } from "../../../../domain/Request/Roles/ToolsRolesRequest";

export class setRole {
  constructor(private repository: RoleRepository) { }

  async run(data: ToolsRoleRequest): Promise<ToolsRoleRequest> {
    return this.repository.setRoleRepository(data);
  }
}