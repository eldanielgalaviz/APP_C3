import { Router } from "express";
import { OriginationPrePinAssumptionsController } from "../controllers/OriginationPrePinAssumptionsController";
import { AuthMiddleware } from "../../../../shared/middleware/AuthMiddleware";
import { asyncWrapper } from "../../../../shared/middleware/asyncHandler";

export class OriginationPrePinAssumptionsRoutes {
  static register(router: Router): void {
    const authRouter = Router();
    router.use('/origination', authRouter);

    const controller = new OriginationPrePinAssumptionsController();

    authRouter.get('/getPrePinAssumptions/:id',  AuthMiddleware.authenticate, asyncWrapper(controller.getPrePinAssumptions));
    authRouter.post('/setPrePinOrigination',      AuthMiddleware.authenticate, asyncWrapper(controller.setPrePinOrigination));
    authRouter.post('/setPrePinMrv',              AuthMiddleware.authenticate, asyncWrapper(controller.setPrePinMrv));
    authRouter.post('/setPrePinSafeguards',       AuthMiddleware.authenticate, asyncWrapper(controller.setPrePinSafeguards));
  }
}