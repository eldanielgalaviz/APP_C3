import { Router } from "express";
import { OriginationLegalKycController } from "../controllers/OriginationLegalKycController";
import { AuthMiddleware } from "../../../../shared/middleware/AuthMiddleware";
import { asyncWrapper } from "../../../../shared/middleware/asyncHandler";
import { uploadLegalKycFields } from "../../../../shared/middleware/FileMiddlewares/projectAreaMiddleware";

export class OriginationLegalKycRoutes {
  static register(router: Router): void {
    const authRouter = Router();
    router.use('/origination', authRouter);

    const controller = new OriginationLegalKycController();

    authRouter.get('/getLegalKYC/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getLegalKYC));
    authRouter.post('/setLegalKYC', AuthMiddleware.authenticate, uploadLegalKycFields, asyncWrapper(controller.setLegalKYC));
  }
}