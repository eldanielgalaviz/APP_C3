import { ProjectManagerRequest } from "../../Request/PlanAndTeam/catalogs/ProjectManagerRequest";
import { SmesRequest } from "../../Request/PlanAndTeam/catalogs/SmesRequest";

export interface ImplementationPlanTeamCatalogRepository {
  getProjectManagers(): Promise<ProjectManagerRequest[]>;
  getSmes(): Promise<SmesRequest[]>;
}