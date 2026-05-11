import { Router } from "express";
import { AuthMiddleware } from "../../../../../shared/middleware/AuthMiddleware";
import { SubMenuController } from "../../../../../controllers/ToolsControllers/Menus/SubMenuController";
import { asyncWrapper } from "../../../../../utils/asyncWrapper";

export class SubMenuRoutes {
    static register(router: Router): void {
        const subMenuRouter = Router();

        router.use('/subMenu', subMenuRouter);

        const controller = new SubMenuController();

        subMenuRouter.get('/getSubMenu', AuthMiddleware.authenticate, asyncWrapper(controller.getSubMenu));
        subMenuRouter.post('/setSubMenu', AuthMiddleware.authenticate, asyncWrapper(controller.setSubMenu));
    }
}