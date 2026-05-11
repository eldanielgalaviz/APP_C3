import { NextFunction, Request, Response } from 'express';
import { ToolsRoleRequest } from '../../../modules/Tools/domain/Request/Roles/ToolsRolesRequest';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { toolsContainer } from '../../../shared/containers/Tools/toolsContainer';

export class RoleController {
    constructor() {}

    async setRole(req: Request, res: Response, next: NextFunction) {
        try {
            const module = plainToInstance(ToolsRoleRequest, req.body);
            const errors = await validate(module);
            
            if (errors.length > 0) {
                return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }
        
            const setOrigination = await toolsContainer.Roles.setRole.run(module);
            return res.status(200).json({ valido: 1, result: setOrigination});
        } catch (error) {
            next(error);
        }
    }
    
    async getRole(req: Request, res: Response, next: NextFunction){
        try {   
            const getOrigination = await toolsContainer.Roles.getRole.run();
            return res.status(200).json({valido: 1, result: getOrigination});
        } catch (error) {
            next(error)
        }
    }
}