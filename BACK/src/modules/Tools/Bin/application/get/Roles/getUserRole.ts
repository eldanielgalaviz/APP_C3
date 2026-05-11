import { UserRoleRepository } from "../../../../domain/Repositories/Roles/ToolsUserRoleRepository";

export class getUserRole {
  constructor(private repository: UserRoleRepository) {}

  async run(): Promise<any> {
    return this.repository.getUserRoleRepository();
  }
}