import { Router } from "express";
import { OriginationCDREstimationController } from "../controllers/OriginationCDREstimationController";
import { AuthMiddleware } from "../../../../shared/middleware/AuthMiddleware";
import { asyncWrapper } from "../../../../shared/middleware/asyncHandler";


export class OriginationCDREstimationRoutes {
  static register(router: Router): void {
    const authRouter = Router();
    router.use('/origination', authRouter);

    const controller = new OriginationCDREstimationController();

    authRouter.get('/getCDREstimation/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getCDREstimation)); 
    authRouter.post('/setCDREstimation', AuthMiddleware.authenticate, asyncWrapper(controller.setCDREstimation)); 
  }
}