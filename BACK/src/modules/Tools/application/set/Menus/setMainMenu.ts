import { MainMenuRepository } from "../../../domain/Repositories/Menus/ToolsMainMenuRepository";
import { ToolsMainMenuRequest } from "../../../domain/Request/Menus/ToolsMainMenuRequest";

export class setMainMenu {
  constructor(private repository: MainMenuRepository) { }

  async run(data: ToolsMainMenuRequest, userId: number): Promise<ToolsMainMenuRequest> {
    return this.repository.setMainMenuRepository(data, userId);
  }
}