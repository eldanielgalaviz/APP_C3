import { SubMenuRepository } from "../../../../domain/Repositories/Menus/ToolsSubMenuRepository";

export class getSubMenu {
  constructor(private repository: SubMenuRepository) {}

  async run(): Promise<any> {
    return this.repository.getSubMenuRepository();
  }
}