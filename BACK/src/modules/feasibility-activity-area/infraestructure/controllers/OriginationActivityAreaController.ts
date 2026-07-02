import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { originationContainer } from '../../../../bootstrap/containers/OriginationContainer';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { ActivityAreaRequest } from '../../domain/Request/OriginationActivityAreasRequest';

export class OriginationActivityAreaController {
  constructor() {}

    /** Origination - activity area */
    async getActivityArea(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.ActivityArea.getActivityArea.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    async setActivityArea(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = AuthMiddleware.userLogged(req)
            const data = plainToInstance(ActivityAreaRequest, req.body);
            const errors = await validate(data);

            if (errors.length > 0) {
            return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.ActivityArea.setActivityArea.run(data, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }
    
}