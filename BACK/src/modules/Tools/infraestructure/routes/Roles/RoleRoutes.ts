import { Router } from "express";
import { AuthMiddleware } from "../../../../../shared/middleware/AuthMiddleware";
import { asyncWrapper } from "../../../../../shared/middleware/asyncHandler";
import { RoleController } from "../../controllers/Roles/RoleController";

export class RoleRoutes {
    static register(router: Router): void {
        const moduleRouter = Router();

        router.use('/role', moduleRouter);

        const controller = new RoleController();

        moduleRouter.get('/getRole', AuthMiddleware.authenticate, asyncWrapper(controller.getRole));
        moduleRouter.post('/setRole', AuthMiddleware.authenticate, asyncWrapper(controller.setRole));
    }
}