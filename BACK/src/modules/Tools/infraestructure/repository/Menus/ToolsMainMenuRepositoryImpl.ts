import { executeStoredProcedure, executeViews } from "../../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { MainMenuRepository } from "../../../domain/Repositories/Menus/ToolsMainMenuRepository";

export class MainMenuRepositoryImpl implements MainMenuRepository {

  async getMainMenuRepository(): Promise<any> {
    const result = await executeViews('vw_tool_mainmenu_rel');
    return result[0];
  }

  async setMainMenuRepository(data: any, userId: number): Promise<any> {
    const params = [...Object.values(data), userId];
    const result = await executeStoredProcedure('sp_set_main_menu_rel', params);
    return result[0];
  }

}