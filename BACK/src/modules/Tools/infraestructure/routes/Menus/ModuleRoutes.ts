import { Router } from "express";
import { AuthMiddleware } from "../../../../../shared/middleware/AuthMiddleware";
import { asyncWrapper } from "../../../../../shared/middleware/asyncHandler";
import { ModuleController } from "../../controllers/Menus/ModuleController";

export class ModuleRoutes {
    static register(router: Router): void {
        const moduleRouter = Router();

        router.use('/module', moduleRouter);

        const controller = new ModuleController();

        moduleRouter.get('/getModule', AuthMiddleware.authenticate, asyncWrapper(controller.getModule));
        moduleRouter.post('/setModule', AuthMiddleware.authenticate, asyncWrapper(controller.setModule));
    }
}