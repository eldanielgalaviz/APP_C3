import { asyncWrapper } from '../../../../../utils/asyncWrapper';
import { Router } from 'express';
import { AuthMiddleware } from '../../../../../shared/middleware/AuthMiddleware';
import { MainMenuController } from '../../../../../controllers/ToolsControllers/Menus/MainMenuController';

export class MainMenusRoutes {
    static register(router: Router): void {
        const mainMenuRouter = Router();
        router.use('/mainMenu', mainMenuRouter);

        const controller = new MainMenuController();

        mainMenuRouter.get('/getMainMenu', AuthMiddleware.authenticate, asyncWrapper(controller.getMainMenu));
        mainMenuRouter.post('/setMainMenu', AuthMiddleware.authenticate, asyncWrapper(controller.setMainMenu));
    }
}