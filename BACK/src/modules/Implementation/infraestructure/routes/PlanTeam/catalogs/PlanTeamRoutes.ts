import { Router } from "express";
import { AuthMiddleware } from "../../../../../../shared/middleware/AuthMiddleware";
import { PlanTeamCatalogController } from "../../../../../../controllers/ImplementationControllers/PlanAndTeam/Catalogs/ImplementationPlanTeamCatalogController";
import { asyncWrapper } from "../../../../../../utils/asyncWrapper";

export class PlanTeamCatalogsRoutes {
    static register(router: Router): void {
        const moduleRouter = Router();

        router.use('/plan-team', moduleRouter);

        const controller = new PlanTeamCatalogController();

        moduleRouter.get('/getProjectManagers', AuthMiddleware.authenticate, asyncWrapper(controller.getProjectManagers));
        moduleRouter.get('/getSmes', AuthMiddleware.authenticate, asyncWrapper(controller.getSmes));
    }
}