import { asyncWrapper } from '../../../../utils/asyncWrapper';
import { Router } from 'express';
import { OriginationController } from '../../../../controllers/OriginationControllers/OriginationController';

export class OriginationRoutes {
  static register(router: Router): void {
    const authRouter = Router();
    router.use('/origination', authRouter);

    const controller = new OriginationController();

    authRouter.get('/getOrigination/:id', asyncWrapper(controller.getOrigination));
    authRouter.post('/setOrigination', asyncWrapper(controller.setOrigination));
  }
}