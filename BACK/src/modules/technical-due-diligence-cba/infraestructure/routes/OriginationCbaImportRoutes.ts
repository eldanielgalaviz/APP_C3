import { Router } from "express";
import { OriginationCbaImportController } from "../controllers/OriginationCbaImportController";
import { AuthMiddleware } from "../../../../shared/middleware/AuthMiddleware";
import { asyncWrapper } from "../../../../shared/middleware/asyncHandler";

export class OriginationCbaImportRoutes {
  static register(router: Router): void {
    const authRouter = Router();
    router.use('/origination', authRouter);

    const controller = new OriginationCbaImportController();
    
    authRouter.post('/setCBAimport', AuthMiddleware.authenticate, asyncWrapper(controller.setCbaImport));
    authRouter.get('/getCbaImport/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getCbaImport));
  }
}