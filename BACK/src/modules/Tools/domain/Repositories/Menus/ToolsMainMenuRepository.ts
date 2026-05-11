import { ToolsMainMenuRequest } from "../../Request/Menus/ToolsMainMenuRequest";

export interface MainMenuRepository {
  getMainMenuRepository(): Promise<ToolsMainMenuRequest>;
  setMainMenuRepository(menu: ToolsMainMenuRequest, userId: number): Promise<ToolsMainMenuRequest>;
}