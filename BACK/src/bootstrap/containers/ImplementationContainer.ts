import { getProjectManagers } from "../../modules/plan-and-team/application/get/PlanAndTeam/catalogs/getProjectManagers";
import { getSmes } from "../../modules/plan-and-team/application/get/PlanAndTeam/catalogs/getSmes";
import { getPlanTeam } from "../../modules/plan-and-team/application/get/PlanAndTeam/getPlanTeam";
import { getSmeByPlanTeam } from "../../modules/plan-and-team/application/get/PlanAndTeam/getSmeByPlanTeam";
import { setPlanTeam } from "../../modules/plan-and-team/application/set/PlanAndTeam/setPlanTeam";
import { setSmeByPlanTeam } from "../../modules/plan-and-team/application/set/PlanAndTeam/setSmeByPlanTeam";
import { ImplementationPlanTeamCatalogRepositoryImpl } from "../../modules/plan-and-team/infraestructure/repositories/PlanAndTeam/ImplementationPlanTeamCatalogRepositoryImpl";
import { PlanTeamRepositoryImpl } from "../../modules/plan-and-team/infraestructure/repositories/PlanAndTeam/ImplementationPlanTeamRepositoryImpl";
import { SmeByPlanTeamRepositoryImpl } from "../../modules/plan-and-team/infraestructure/repositories/PlanAndTeam/ImplementationSmeByPlanTeamRepositoryImpl";

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