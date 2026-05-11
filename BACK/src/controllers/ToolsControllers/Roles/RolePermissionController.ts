import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { toolsContainer } from '../../../shared/containers/Tools/toolsContainer';
import { ToolsRolePermissionRequest } from '../../../modules/Tools/domain/Request/Roles/ToolsRolePermissionRequest';


export class RolePermissionController {
    constructor() {}

    async setRolePermission(req: Request, res: Response, next: NextFunction) {
        try {
            const module = plainToInstance(ToolsRolePermissionRequest, req.body);
            const errors = await validate(module);
            
            if (errors.length > 0) {
                return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }
        
            const setRolePermission = await toolsContainer.Roles.setRolePermission.run(module);
            return res.status(200).json({ valido: 1, result: setRolePermission});
        } catch (error) {
            next(error);
        }
    }
    
    async getRolePermission(req: Request, res: Response, next: NextFunction){
        try {   
            const getRolePermission = await toolsContainer.Roles.getRolePermission.run();
            return res.status(200).json({valido: 1, result: getRolePermission});
        } catch (error) {
            next(error)
        }
    }
}