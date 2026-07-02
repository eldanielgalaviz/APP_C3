import { Router } from "express";
import { OriginationPEDController } from "../controllers/OriginationPEDController";
import { AuthMiddleware } from "../../../../shared/middleware/AuthMiddleware";
import { uploadPedFields } from "../../../../shared/middleware/FileMiddlewares/projectAreaMiddleware";
import { asyncWrapper } from "../../../../shared/middleware/asyncHandler";

export class OriginationPEDRoutes {
  static register(router: Router): void {
    const authRouter = Router();
    router.use('/origination', authRouter);

    const controller = new OriginationPEDController();

    authRouter.get('/getPed/:id',          AuthMiddleware.authenticate, asyncWrapper(controller.getPed));
    authRouter.post('/setPedOrigination',   AuthMiddleware.authenticate, asyncWrapper(controller.setPedOrigination));
    authRouter.post('/setPedSig',           AuthMiddleware.authenticate, uploadPedFields, asyncWrapper(controller.setPedSig));
  }
}