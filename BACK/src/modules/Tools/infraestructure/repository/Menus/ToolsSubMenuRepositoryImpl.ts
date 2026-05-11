import { executeStoredProcedure, executeViews } from "../../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { SubMenuRepository } from "../../../domain/Repositories/Menus/ToolsSubMenuRepository";

export class SubMenuRepositoryImpl implements SubMenuRepository {

  async getSubMenuRepository(): Promise<any> {
    const result = await executeViews('vw_tool_submenu_rel');
    return result[0];
  }

  async setSubMenuRepository(data: any, userId: number): Promise<any> {
    const params = [...Object.values(data), userId];
    const result = await executeStoredProcedure('sp_set_submenu_rel', params);
    return result[0];
  }
  
}