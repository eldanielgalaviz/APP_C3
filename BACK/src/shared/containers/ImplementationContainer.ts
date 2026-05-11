import { getProjectManagers } from "../../modules/Implementation/Bin/application/get/PlanAndTeam/catalogs/getProjectManagers";
import { getSmes } from "../../modules/Implementation/Bin/application/get/PlanAndTeam/catalogs/getSmes";
import { getPlanTeam } from "../../modules/Implementation/Bin/application/get/PlanAndTeam/getPlanTeam";
import { getSmeByPlanTeam } from "../../modules/Implementation/Bin/application/get/PlanAndTeam/getSmeByPlanTeam";
import { setPlanTeam } from "../../modules/Implementation/Bin/application/set/PlanAndTeam/setPlanTeam";
import { setSmeByPlanTeam } from "../../modules/Implementation/Bin/application/set/PlanAndTeam/setSmeByPlanTeam";
import { ImplementationPlanTeamCatalogRepositoryImpl } from "../../modules/Implementation/infraestructure/repositories/PlanAndTeam/ImplementationPlanTeamCatalogRepositoryImpl";
import { PlanTeamRepositoryImpl } from "../../modules/Implementation/infraestructure/repositories/PlanAndTeam/ImplementationPlanTeamRepositoryImpl";
import { SmeByPlanTeamRepositoryImpl } from "../../modules/Implementation/infraestructure/repositories/PlanAndTeam/ImplementationSmeByPlanTeamRepositoryImpl";

const planTeamRepository = new PlanTeamRepositoryImpl();
const smePlanTeamRepository = new SmeByPlanTeamRepositoryImpl();
const planTeamCatalogRepository = new ImplementationPlanTeamCatalogRepositoryImpl();

export const implementationContainer = {

    planTeam: {
        getPlanTeam: new getPlanTeam(planTeamRepository),
        setPlanTeam: new setPlanTeam(planTeamRepository),

        getSmeByPlanTeam: new getSmeByPlanTeam(smePlanTeamRepository),
        setSmeByPlanTeam: new setSmeByPlanTeam(smePlanTeamRepository),

        catalogs: {
            getProjectManagers: new getProjectManagers(planTeamCatalogRepository),
            getSmes: new getSmes(planTeamCatalogRepository),
        }
    }
}