import { ToolsUserModuleRequest } from "../../Request/Roles/ToolsUserModuleRequest";

export interface UserModuleRepository {
  getUserModuleRepository(): Promise<any>;
  setUserModuleRepository(role: ToolsUserModuleRequest): Promise<ToolsUserModuleRequest>;
}