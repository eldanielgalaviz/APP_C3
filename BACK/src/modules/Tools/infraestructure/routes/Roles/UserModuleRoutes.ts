import { Router } from "express";
import { AuthMiddleware } from "../../../../../shared/middleware/AuthMiddleware";
import { asyncWrapper } from "../../../../../utils/asyncWrapper";
import { UserModuleController } from "../../../../../controllers/ToolsControllers/Roles/UserModuleController";

export class UserModuleRoutes {
    static register(router: Router): void {
        const moduleRouter = Router();

        router.use('/usermodule', moduleRouter);

        const controller = new UserModuleController();

        moduleRouter.get('/getUserModule', AuthMiddleware.authenticate, asyncWrapper(controller.getUserModule));
        moduleRouter.post('/setUserModule', AuthMiddleware.authenticate, asyncWrapper(controller.setUserModule));
    }
}