import { PermissionUserRepository } from "../../../domain/Repositories/Roles/ToolsPermissionUserRepository";
export class getPermissionUser {
  constructor(private repository: PermissionUserRepository) {}

  async run(): Promise<any> {
    return this.repository.getPermissionUserRepository();
  }
}