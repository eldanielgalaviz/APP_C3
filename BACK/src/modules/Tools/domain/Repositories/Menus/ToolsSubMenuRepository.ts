import { ToolsSubMenuRequest } from "../../Request/Menus/ToolsSubMenuRequest";

export interface SubMenuRepository {
  getSubMenuRepository(): Promise<ToolsSubMenuRequest>;
  setSubMenuRepository(menu: ToolsSubMenuRequest, userId: number): Promise<ToolsSubMenuRequest>;
}