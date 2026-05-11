import { executeStoredProcedure, executeViews } from "../../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { UserModuleRepository } from "../../../domain/Repositories/Roles/ToolsUserModuleRepository";

export class UserModuleRepositoryImpl implements UserModuleRepository {
    
  async getUserModuleRepository(): Promise<any> {
    const result = await executeViews('vw_tool_user_module');
    return result[0];
  }

    //   Falta añadir el request para tipar el set
  async setUserModuleRepository(data: any): Promise<any> {
    const params = [...Object.values(data)];
    const result = await executeStoredProcedure('sp_set_user_rel_module', params);
    return result[0];
  }
  
}