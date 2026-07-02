import { Router } from "express";
import { OriginationProjectApprovalController } from "../controllers/OriginationProjectApprovalController";
import { AuthMiddleware } from "../../../../shared/middleware/AuthMiddleware";
import { asyncWrapper } from "../../../../shared/middleware/asyncHandler";

export class OriginationProjectApprovalRoutes {
  static register(router: Router): void {
    const authRouter = Router();
    router.use('/origination', authRouter);

    const controller = new OriginationProjectApprovalController();

    authRouter.get('/getProjectApproval/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getProjectApproval));
    authRouter.post('/setProjectApproval', AuthMiddleware.authenticate, asyncWrapper(controller.setProjectApproval));
  }
}