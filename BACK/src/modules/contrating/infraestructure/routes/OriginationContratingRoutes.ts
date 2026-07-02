import { Router } from "express";
import { OriginationContratingController } from "../controllers/OriginationContratingController";
import { AuthMiddleware } from "../../../../shared/middleware/AuthMiddleware";
import { asyncWrapper } from "../../../../shared/middleware/asyncHandler";

export class OriginationContratingRoutes {
  static register(router: Router): void {
        const authRouter = Router();
        router.use('/origination', authRouter);
    
        const controller = new OriginationContratingController();
        authRouter.get('/getContrating/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getContrating));
        authRouter.post('/setContrating', AuthMiddleware.authenticate, asyncWrapper(controller.setContrating));
  }
}