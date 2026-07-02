import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { toolsContainer } from '../../../../../bootstrap/containers/Tools/toolsContainer';
import { ToolsSubMenuRequest } from '../../../domain/Request/Menus/ToolsSubMenuRequest';
import { AuthMiddleware } from '../../../../../shared/middleware/AuthMiddleware';

export class SubMenuController {
    constructor() {}

    async setSubMenu(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = AuthMiddleware.userLogged(req)
            const subMenu = plainToInstance(ToolsSubMenuRequest, req.body);
            const errors = await validate(subMenu);
            
            if (errors.length > 0) {
                return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }
        
            const setSubMenu = await toolsContainer.Menus.setSubMenu.run(subMenu, catchUser);
            return res.status(200).json({ valido: 1, result: setSubMenu});
        } catch (error) {
            next(error);
        }
    }
    
    async getSubMenu(req: Request, res: Response, next: NextFunction){
        try {   
            const getSubMenu = await toolsContainer.Menus.getSubMenu.run();
            return res.status(200).json({valido: 1, result: getSubMenu});
        } catch (error) {
            next(error)
        }
    }
}