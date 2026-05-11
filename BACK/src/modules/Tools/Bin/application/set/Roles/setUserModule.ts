import { UserModuleRepository } from "../../../../domain/Repositories/Roles/ToolsUserModuleRepository";
import { ToolsUserModuleRequest } from "../../../../domain/Request/Roles/ToolsUserModuleRequest";

export class setUserModule {
  constructor(private repository: UserModuleRepository) { }

  async run(data: ToolsUserModuleRequest): Promise<ToolsUserModuleRequest> { // aqui va el request, aún no lo tengo
    return this.repository.setUserModuleRepository(data);
  }
}