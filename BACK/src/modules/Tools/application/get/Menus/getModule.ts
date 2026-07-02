import { ModuleRepository } from "../../../domain/Repositories/Menus/ToolsModuleRepository";

export class getModule {
  constructor(private repository: ModuleRepository) {}

  async run(): Promise<any> {
    return this.repository.getModuleRepository();
  }
}