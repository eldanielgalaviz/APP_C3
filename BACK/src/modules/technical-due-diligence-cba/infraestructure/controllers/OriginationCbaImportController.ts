import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CbaImportRequest } from '../../domain/Request/OriginationCBAImportRequest';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { originationContainer } from '../../../../bootstrap/containers/OriginationContainer';

export class OriginationCbaImportController {
  constructor() {}

      /** Origination - CBA imports */
    async setCbaImport(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = AuthMiddleware.userLogged(req)
            const data = plainToInstance(CbaImportRequest, req.body);
            const errors = await validate(data);   
            
            if (errors.length > 0) {
            return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.CbaImport.setCbaImport.run(data, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    async getCbaImport(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.CbaImport.getCbaImport.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }
}