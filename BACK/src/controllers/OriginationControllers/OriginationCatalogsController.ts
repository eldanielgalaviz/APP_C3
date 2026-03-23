import { NextFunction, Request, Response } from 'express';
import { ServiceContainer } from '../../shared/ServiceContainer';

export class OriginationCatalogController {
    constructor() {}

    async getPostalCodes(req: Request, res: Response, next: NextFunction){
        try {
            const idorigination = Number(req.params.id);
            const getOrigination = await ServiceContainer.origination;
            return res.status(200).json({valido: 1, result: getOrigination});
        } catch (error) {
            next(error)
        }
    }
}