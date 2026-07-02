import { MainMenuRepository } from "../../../domain/Repositories/Menus/ToolsMainMenuRepository";

export class getMainMenu {
  constructor(private repository: MainMenuRepository) {}

  async run(): Promise<any> {
    return this.repository.getMainMenuRepository();
  }
}