import { executeViews } from "../../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { ImplementationPlanTeamCatalogRepository } from "../../../domain/Repositories/PlanAndTeam/ImplementationPlanTeamCatalog";
import { ProjectManagerRequest } from "../../../domain/Request/PlanAndTeam/catalogs/ProjectManagerRequest";
import { SmesRequest } from "../../../domain/Request/PlanAndTeam/catalogs/SmesRequest";

export class ImplementationPlanTeamCatalogRepositoryImpl implements ImplementationPlanTeamCatalogRepository {

    async getProjectManagers(): Promise<ProjectManagerRequest[]> {
        const result = await executeViews('vw_project_managers');
        return result[0];
    }

    async getSmes(): Promise<SmesRequest[]> {
        const result = await executeViews('vw_smes');
        return result[0];
    }

}