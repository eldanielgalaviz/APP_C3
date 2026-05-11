import { ModuleRepository } from "../../../../domain/Repositories/Menus/ToolsModuleRepository";
import { ToolsModuleRequest } from "../../../../domain/Request/Menus/ToolsModuleRequest";

export class setModule {
  constructor(private repository: ModuleRepository) { }

  async run(data: ToolsModuleRequest, userId: number): Promise<ToolsModuleRequest> {
    return this.repository.setModuleRepository(data, userId);
  }
}