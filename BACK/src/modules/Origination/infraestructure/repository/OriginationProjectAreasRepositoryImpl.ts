import { executeStoredProcedure } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { ProjectAreasRepository } from "../../domain/Repositories/OriginationProjectAreasRepository";

export class ProjectAreasImpl implements ProjectAreasRepository {

  async getProjectAreasRepository(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_project_areas', [idProject]);
    return result[0];
  }

  async setProjectAreasRepository (data: any, userId: number): Promise<any> {
    const params = [...Object.values(data), userId];
    const result = await executeStoredProcedure('sp_set_project_areas', params);
    return result[0];
  }
}