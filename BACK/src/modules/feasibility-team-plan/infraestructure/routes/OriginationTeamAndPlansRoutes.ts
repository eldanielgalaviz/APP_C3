import { Router } from "express";
import { OriginationTeamAndPlansController } from "../controllers/OriginationTeamAndPlansController";
import { AuthMiddleware } from "../../../../shared/middleware/AuthMiddleware";
import { asyncWrapper } from "../../../../shared/middleware/asyncHandler";

export class OriginationTeamPlansRoutes {
  static register(router: Router): void {
    const authRouter = Router();
    router.use('/origination', authRouter);

    const controller = new OriginationTeamAndPlansController();

    authRouter.get('/getTeamandplans/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getTeamAndPlans));
    authRouter.post('/setTeamandplans', AuthMiddleware.authenticate, asyncWrapper(controller.setTeamAndPlans));
  }
}