import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CatchUserLogged } from '../../../shared/middleware/CatchUserMiddleware';
import { toolsContainer } from '../../../shared/containers/Tools/toolsContainer';
import { ToolsModuleRequest } from '../../../modules/Tools/domain/Request/Menus/ToolsModuleRequest';

export class ModuleController {
    constructor() {}

    async setModule(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = CatchUserLogged.userLogged(req)
            const module = plainToInstance(ToolsModuleRequest, req.body);
            const errors = await validate(module);
            
            if (errors.length > 0) {
                return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }
        
            const setOrigination = await toolsContainer.Menus.setModule.run(module, catchUser);
            return res.status(200).json({ valido: 1, result: setOrigination});
        } catch (error) {
            next(error);
        }
    }
    
    async getModule(req: Request, res: Response, next: NextFunction){
        try {   
            const getOrigination = await toolsContainer.Menus.getModule.run();
            return res.status(200).json({valido: 1, result: getOrigination});
        } catch (error) {
            next(error)
        }
    }
}