import { Router } from "express";
import { OriginationTransactionApprovalController } from "../controllers/OriginationTransactionApprovalController";
import { AuthMiddleware } from "../../../../shared/middleware/AuthMiddleware";
import { asyncWrapper } from "../../../../shared/middleware/asyncHandler";

export class OriginationTransactionApprovalRoutes {

  static register(router: Router): void {
    const authRouter = Router();
    router.use('/origination', authRouter);

    const controller = new OriginationTransactionApprovalController();

    authRouter.get('/getTransactionApproval/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getTransactionApproval));
    authRouter.post('/setTransactionApproval', AuthMiddleware.authenticate, asyncWrapper(controller.setTransactionApproval));
  }
}