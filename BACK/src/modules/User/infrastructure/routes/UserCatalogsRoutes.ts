// src/modules/User/infrastructure/routes/UserRoutes.ts
import { Router } from 'express';
import { UserController } from '../controllers/UserControllers';
import { asyncWrapper } from '../../../../shared/middleware/asyncHandler';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { UsersCatalogController } from '../controllers/UserCatalogsControllers';

export class UserCatalogRoutes {
  static register(router: Router): void {
    const userRouter = Router();

    router.use('/users/catalogs', userRouter);

    const controller = new UsersCatalogController();

    userRouter.get('/getDepartments', AuthMiddleware.authenticate,asyncWrapper(controller.ct_department));
    userRouter.get('/getPositions', AuthMiddleware.authenticate,asyncWrapper(controller.ct_position_user));
  }
}