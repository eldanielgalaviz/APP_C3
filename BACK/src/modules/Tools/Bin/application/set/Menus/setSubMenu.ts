import { SubMenuRepository } from "../../../../domain/Repositories/Menus/ToolsSubMenuRepository";
import { ToolsSubMenuRequest } from "../../../../domain/Request/Menus/ToolsSubMenuRequest";

export class setSubMenu {
  constructor(private repository: SubMenuRepository) { }

  async run(data: ToolsSubMenuRequest, userId: number): Promise<ToolsSubMenuRequest> {
    return this.repository.setSubMenuRepository(data, userId);
  }
}