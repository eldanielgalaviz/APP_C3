import { asyncWrapper } from '../../../../shared/middleware/asyncHandler';
import { Router } from 'express';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { uploadFields, uploadPolygon  } from '../../../../shared/middleware/FileMiddlewares/projectAreaMiddleware';
import { OriginationController } from '../controllers/OriginationController';

export class OriginationRoutes {
  static register(router: Router): void {
    const authRouter = Router();
    router.use('/origination', authRouter);

    const controller = new OriginationController();

    authRouter.get('/getOrigination/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getOrigination));
    authRouter.post('/setOrigination', AuthMiddleware.authenticate, uploadPolygon, asyncWrapper(controller.setOrigination));

    authRouter.post('/getFileWithPath', AuthMiddleware.authenticate, uploadFields, asyncWrapper(controller.getFileWithPath));
    authRouter.get('/getProjects', AuthMiddleware.authenticate, asyncWrapper(controller.getProjects));

 



    authRouter.get('/getOverview/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getOverview));

  }
}