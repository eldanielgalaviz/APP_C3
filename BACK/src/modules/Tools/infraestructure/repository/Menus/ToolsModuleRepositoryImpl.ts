import { executeStoredProcedure, executeViews } from "../../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { ModuleRepository } from "../../../domain/Repositories/Menus/ToolsModuleRepository";


export class ModuleRepositoryImpl implements ModuleRepository {
    
  async getModuleRepository(): Promise<any> {
    const result = await executeViews('vw_tool_module');
    return result[0];
  }

  async setModuleRepository(data: any, userId: number): Promise<any> {
    const params = [...Object.values(data), userId];
    const result = await executeStoredProcedure('sp_set_modules', params);
    return result[0];
  }
  
}