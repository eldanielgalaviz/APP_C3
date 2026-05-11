import { RoleRepository } from "../../../../domain/Repositories/Roles/ToolsRolesRepository";

export class getRole {
  constructor(private repository: RoleRepository) {}

  async run(): Promise<any> {
    return this.repository.getRoleRepository();
  }
}