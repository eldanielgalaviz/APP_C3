// src/modules/User/infrastructure/routes/UserRoutes.ts
import { Router } from 'express';
import { UserController } from '../controllers/UserControllers';
import { asyncWrapper } from '../../../../shared/middleware/asyncHandler';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { uploadProfileImageFields } from '../../../../shared/middleware/FileMiddlewares/projectAreaMiddleware';

export class UserRoutes {
  static register(router: Router): void {
    const userRouter = Router();

    router.use('/users', userRouter);

    const controller = new UserController();

    userRouter.get('/getUsers', AuthMiddleware.authenticate,asyncWrapper(controller.getUsers));
    userRouter.post('/setUsers', AuthMiddleware.authenticate, asyncWrapper(controller.setUsers));
    userRouter.get('/getUserMenu', AuthMiddleware.authenticate, asyncWrapper(controller.getUserMenu));
    userRouter.post('/setUserProfileImage', AuthMiddleware.authenticate, uploadProfileImageFields, asyncWrapper(controller.setUserProfileImage));
    userRouter.get('/getUserProfileImage', AuthMiddleware.authenticate, asyncWrapper(controller.getUserProfileImage));
  }
}