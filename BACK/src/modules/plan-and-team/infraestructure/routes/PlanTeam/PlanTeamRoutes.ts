import { Router } from "express";
import { AuthMiddleware } from "../../../../../shared/middleware/AuthMiddleware";
import { asyncWrapper } from "../../../../../shared/middleware/asyncHandler";
import { ImplementationPlanTeamController } from "../../controllers/ImplementationPlanTeamController";

export class PlanTeamRoutes {
    static register(router: Router): void {
        const moduleRouter = Router();

        router.use('/plan-team', moduleRouter);

        const controller = new ImplementationPlanTeamController();

        moduleRouter.get('/getPlanTeam/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getPlanTeam));
        moduleRouter.post('/setPlanTeam', AuthMiddleware.authenticate, asyncWrapper(controller.setPlanTeam));
        moduleRouter.get('/getSmeByPlanTeam/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getSmeByPlanTeam));
    }
}