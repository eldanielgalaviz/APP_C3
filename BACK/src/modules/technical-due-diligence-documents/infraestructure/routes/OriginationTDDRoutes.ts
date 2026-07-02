import { Router } from 'express';
import { asyncWrapper } from '../../../../shared/middleware/asyncHandler';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { uploadTDDFields } from '../../../../shared/middleware/FileMiddlewares/projectAreaMiddleware';
import { OriginationTDDController } from '../controllers/OriginationTDDController';

export class OriginationTDDRoutes {
  static register(router: Router): void {
    const authRouter = Router();
    router.use('/originationTdd', authRouter);

    const controller = new OriginationTDDController();

    authRouter.get('/getTechnicalDueDiligence/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getTechnicalDueDiligence));
    authRouter.post('/setTechnicalDueDiligence', AuthMiddleware.authenticate, uploadTDDFields, asyncWrapper(controller.setTechnicalDueDiligence));
  }
}