import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { originationContainer } from '../../../../bootstrap/containers/OriginationContainer';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { LegalDueDiligenceRequest } from '../../domain/Request/OriginationLegalDueDilicengeRequest';

 
export class OriginationLegalDueDiligenceController {
  constructor() {}
  
    /** Origination - Legal Due Diligence */
    async getLegalDueDiligence(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.LegalDueDiligence.getLegalDueDiligence.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    async setLegalDueDiligence(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = AuthMiddleware.userLogged(req)
            const data = plainToInstance(LegalDueDiligenceRequest, req.body);
            const errors = await validate(data);

            if (errors.length > 0) {
            return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.LegalDueDiligence.setLegalDueDiligence.run(data, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }
}