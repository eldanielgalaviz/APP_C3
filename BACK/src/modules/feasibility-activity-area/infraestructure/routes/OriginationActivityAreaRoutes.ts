import { Router } from "express";
import { OriginationActivityAreaController } from "../controllers/OriginationActivityAreaController";
import { AuthMiddleware } from "../../../../shared/middleware/AuthMiddleware";
import { asyncWrapper } from "../../../../shared/middleware/asyncHandler";

export class OriginationActivityAreaRoutes {
  static register(router: Router): void {
    const authRouter = Router();
    router.use('/origination', authRouter);

    const controller = new OriginationActivityAreaController();
 
    authRouter.get('/getActivityArea/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getActivityArea));
    authRouter.post('/setActivityArea', AuthMiddleware.authenticate, asyncWrapper(controller.setActivityArea)); 
    }
}