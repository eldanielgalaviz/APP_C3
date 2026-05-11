import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { toolsContainer } from '../../../shared/containers/Tools/toolsContainer';
import { ToolsUserModuleRequest } from '../../../modules/Tools/domain/Request/Roles/ToolsUserModuleRequest';

export class UserModuleController {
    constructor() {}

    async setUserModule(req: Request, res: Response, next: NextFunction) {
        try {
            const module = plainToInstance(ToolsUserModuleRequest, req.body);
            const errors = await validate(module);
            
            if (errors.length > 0) {
                return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }
        
            const setUserRole = await toolsContainer.Roles.setUserModule.run(module);
            return res.status(200).json({ valido: 1, result: setUserRole});
        } catch (error) {
            next(error);
        }
    }
    
    async getUserModule(req: Request, res: Response, next: NextFunction){
        try {   
            const getUserModule = await toolsContainer.Roles.getUserModule.run();
            return res.status(200).json({valido: 1, result: getUserModule});
        } catch (error) {
            next(error)
        }
    }
}