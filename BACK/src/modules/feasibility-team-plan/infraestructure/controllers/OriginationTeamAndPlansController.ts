import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { TeamAndPlansRequest } from '../../domain/Request/OriginationTeamAndPlansRequest';
import { originationContainer } from '../../../../bootstrap/containers/OriginationContainer';

export class OriginationTeamAndPlansController {
  constructor() {}

    /** Origination - team and plans */
    async setTeamAndPlans(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = AuthMiddleware.userLogged(req)
            const data = plainToInstance(TeamAndPlansRequest, req.body);
            const errors = await validate(data);

            if (errors.length > 0) {
            return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.teamAndPlans.setTeamAndPlans.run(data, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    async getTeamAndPlans(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.teamAndPlans.getTeamAndPlans.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }
}