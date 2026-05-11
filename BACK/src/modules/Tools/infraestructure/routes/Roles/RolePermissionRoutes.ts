import { Router } from "express";
import { AuthMiddleware } from "../../../../../shared/middleware/AuthMiddleware";
import { asyncWrapper } from "../../../../../utils/asyncWrapper";
import { RolePermissionController } from "../../../../../controllers/ToolsControllers/Roles/RolePermissionController";

export class RolePermissionRoutes {
    static register(router: Router): void {
        const moduleRouter = Router();

        router.use('/rolepermission', moduleRouter);

        const controller = new RolePermissionController();

        moduleRouter.get('/getRolePermission', AuthMiddleware.authenticate, asyncWrapper(controller.getRolePermission));
        moduleRouter.post('/setRolePermission', AuthMiddleware.authenticate, asyncWrapper(controller.setRolePermission));
    }
}