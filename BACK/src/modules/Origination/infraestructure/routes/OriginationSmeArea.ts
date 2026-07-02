import { asyncWrapper } from '../../../../shared/middleware/asyncHandler';
import { Router } from 'express';
import { OriginationCatalogController } from '../controllers/OriginationCatalogsController';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';

export class OriginationSmeAreaRoutes {
  static register(router: Router): void {
    const authRouter = Router();
    router.use('/catalogs', authRouter);

    const controller = new OriginationCatalogController();
authRouter.get('/getSmeArea', AuthMiddleware.authenticate, asyncWrapper(controller.cat_smes));
  }
}