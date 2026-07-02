import { Router } from "express";
import { AuthMiddleware } from "../../../../../shared/middleware/AuthMiddleware";
import { asyncWrapper } from "../../../../../shared/middleware/asyncHandler";
import { PermissionUserController } from "../../controllers/Roles/PermissionUserController";

export class PermissionUserRoutes {
  static register(router: Router): void {
    const permissionUserRouter = Router();

    router.use('/permissionuser', permissionUserRouter);

    const controller = new PermissionUserController();

    permissionUserRouter.get('/getPermissionUser', AuthMiddleware.authenticate, asyncWrapper(controller.getPermissionUser));
    permissionUserRouter.post('/setPermissionUser', AuthMiddleware.authenticate, asyncWrapper(controller.setPermissionUser));
  }
}