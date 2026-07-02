import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ToolsUserRoleRequest } from '../../../domain/Request/Roles/ToolUserRoleRequest';
import { toolsContainer } from '../../../../../bootstrap/containers/Tools/toolsContainer';


export class UserRoleController {
    constructor() {}

    async setUserRole(req: Request, res: Response, next: NextFunction) {
        try {
            const module = plainToInstance(ToolsUserRoleRequest, req.body);
            const errors = await validate(module);
            
            if (errors.length > 0) {
                return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }
        
            const setUserRole = await toolsContainer.Roles.setUserRole.run(module);
            return res.status(200).json({ valido: 1, result: setUserRole});
        } catch (error) {
            next(error);
        }
    }
    
    async getUserRole(req: Request, res: Response, next: NextFunction){
        try {   
            const getUserRole = await toolsContainer.Roles.getUserRole.run();
            return res.status(200).json({valido: 1, result: getUserRole});
        } catch (error) {
            next(error)
        }
    }
}