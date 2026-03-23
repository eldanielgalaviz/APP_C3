import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ServiceContainer } from '../../shared/ServiceContainer';
import { OriginationRequest } from '../../modules/Origination/domain/OriginationRequest';

export class OriginationController {
  constructor() {}

    async setOrigination(req: Request, res: Response, next: NextFunction) {
        try {
            const origination = plainToInstance(OriginationRequest, req.body);
            const errors = await validate(origination);
            
            if (errors.length > 0) {
                return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }
        
            const setOrigination = await ServiceContainer.origination.setOrigination.run(origination);
            return res.status(200).json({ valido: 1, result: setOrigination});
        } catch (error) {
            next(error);
        }
    }

    async getOrigination(req: Request, res: Response, next: NextFunction){
        try {
            const idorigination = Number(req.params.id);
            const getOrigination = await ServiceContainer.origination.getOrigination.run(idorigination);
            return res.status(200).json({valido: 1, result: getOrigination});
        } catch (error) {
            next(error)
        }
    }
}