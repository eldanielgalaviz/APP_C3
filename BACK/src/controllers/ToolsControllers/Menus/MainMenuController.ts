import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CatchUserLogged } from '../../../shared/middleware/CatchUserMiddleware';
import { ToolsMainMenuRequest } from '../../../modules/Tools/domain/Request/Menus/ToolsMainMenuRequest';
import { toolsContainer } from '../../../shared/containers/Tools/toolsContainer';

export class MainMenuController {
    constructor() {}

    async setMainMenu(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = CatchUserLogged.userLogged(req)
            const mainMenu = plainToInstance(ToolsMainMenuRequest, req.body);
            const errors = await validate(mainMenu);
            
            if (errors.length > 0) {
                return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }
        
            const setMainMenu = await toolsContainer.Menus.setMainMenu.run(mainMenu, catchUser);
            return res.status(200).json({ valido: 1, result: setMainMenu});
        } catch (error) {
            next(error);
        }
    }
    
    async getMainMenu(req: Request, res: Response, next: NextFunction){
        try {
            const getMainMenu = await toolsContainer.Menus.getMainMenu.run();
            return res.status(200).json({valido: 1, result: getMainMenu});
        } catch (error) {
            next(error)
        }
    }
}