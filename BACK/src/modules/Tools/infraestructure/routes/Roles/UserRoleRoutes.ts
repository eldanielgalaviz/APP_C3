import { Router } from "express";
import { AuthMiddleware } from "../../../../../shared/middleware/AuthMiddleware";
import { asyncWrapper } from "../../../../../shared/middleware/asyncHandler";
import { UserRoleController } from "../../controllers/Roles/UserRoleController";

export class UserRoleRoutes {
    static register(router: Router): void {
        const moduleRouter = Router();

        router.use('/userrole', moduleRouter);

        const controller = new UserRoleController();

        moduleRouter.get('/getUserRole', AuthMiddleware.authenticate, asyncWrapper(controller.getUserRole));
        moduleRouter.post('/setUserRole', AuthMiddleware.authenticate, asyncWrapper(controller.setUserRole));
    }
}