import { ToolsModuleRequest } from "../../Request/Menus/ToolsModuleRequest";

export interface ModuleRepository {
  getModuleRepository(): Promise<ToolsModuleRequest>;
  setModuleRepository(menu: ToolsModuleRequest, userId: number): Promise<ToolsModuleRequest>;
}