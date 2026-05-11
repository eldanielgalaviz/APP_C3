import { UserModuleRepository } from "../../../../domain/Repositories/Roles/ToolsUserModuleRepository";

export class getUserModule {
  constructor(private repository: UserModuleRepository) {}

  async run(): Promise<any> {
    return this.repository.getUserModuleRepository();
  }
}