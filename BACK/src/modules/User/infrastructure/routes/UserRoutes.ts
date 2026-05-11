// src/modules/User/infrastructure/routes/UserRoutes.ts
import { Router } from 'express';
import { UserController } from '../../../../controllers/UserControllers/UserControllers';
import { asyncWrapper } from '../../../../utils/asyncWrapper';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';

export class UserRoutes {
  static register(router: Router): void {
    const userRouter = Router();

    router.use('/users', userRouter);

    const controller = new UserController();

    userRouter.get('/getUsers', AuthMiddleware.authenticate,asyncWrapper(controller.getUsers));
    userRouter.post('/setUsers', AuthMiddleware.authenticate, asyncWrapper(controller.setUsers));
    userRouter.get('/getUserMenu', AuthMiddleware.authenticate, asyncWrapper(controller.getUserMenu));
  }
}