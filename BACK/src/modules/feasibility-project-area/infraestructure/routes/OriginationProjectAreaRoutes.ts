import { asyncWrapper } from '../../../../shared/middleware/asyncHandler';
import { Router } from 'express';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { OriginationProjectAreaController } from '../controllers/OriginationProjectAreaController';
import { uploadFields } from '../../../../shared/middleware/FileMiddlewares/projectAreaMiddleware';

export class OriginationProjectAreaRoutes {
  static register(router: Router): void {
    const authRouter = Router();
    router.use('/origination', authRouter);

    const controller = new OriginationProjectAreaController();

    authRouter.get('/getProjectAreas/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getProjectAreas));
    authRouter.post('/setProjectAreas', AuthMiddleware.authenticate, uploadFields, asyncWrapper(controller.setProjectAreas));
  }
}