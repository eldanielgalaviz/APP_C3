import { NextFunction, Request, Response } from 'express';

import { PermissionsContainer } from "../../../../bootstrap/containers/PermissionsContainer";

export class PermissionsController {
    constructor() {}
async getPermissionUser(req: Request, res: Response, next: NextFunction){
        try {
            const Idpermissionuser = Number(req.params.id);
            const GetPermissions = await PermissionsContainer.permissionsContainerType.GetPermissions.run(Idpermissionuser);
            return res.status(200).json({valido: 1, result: GetPermissions});
        } catch (error) {
            next(error)
        }
    }
}