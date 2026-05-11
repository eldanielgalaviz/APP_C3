import { ProjectAreasRequest } from "../Request/OriginationProjectAreasRequest";

export interface ProjectAreasRepository {
  getProjectAreasRepository(idProject: number): Promise<any>;
  setProjectAreasRepository(data: ProjectAreasRequest, userId: number): Promise<any>;
}
