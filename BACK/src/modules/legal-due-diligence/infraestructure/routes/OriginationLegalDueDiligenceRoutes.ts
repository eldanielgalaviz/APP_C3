import { Router } from "express";
import { OriginationLegalDueDiligenceController } from "../controllers/OriginationLegalDueDiligenceController";
import { AuthMiddleware } from "../../../../shared/middleware/AuthMiddleware";
import { asyncWrapper } from "../../../../shared/middleware/asyncHandler";

export class OriginationLegalDueDiligenceRoutes {
  static register(router: Router): void {
    const authRouter = Router();
    router.use('/origination', authRouter);

    const controller = new OriginationLegalDueDiligenceController();

    authRouter.get('/getLegalDueDiligence/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getLegalDueDiligence)); 
    authRouter.post('/setLegalDueDiligence', AuthMiddleware.authenticate, asyncWrapper(controller.setLegalDueDiligence));
  }
}