import { Router } from 'express';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { asyncWrapper } from '../../../../shared/middleware/asyncHandler';
import { PermissionsController } from '../controllers/PermissionsControllers';


export class PermissionsRoutes {
    static register(router: Router): void {
        const moduleRouter = Router();

        router.use('/permissionssub', moduleRouter);

        const controller = new PermissionsController();

        moduleRouter.get('/getPermissions/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getPermissionUser));
    }
}