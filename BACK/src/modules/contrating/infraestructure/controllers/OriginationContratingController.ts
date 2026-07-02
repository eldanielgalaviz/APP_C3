import { Request, Response, NextFunction } from "express";
import { originationContainer } from "../../../../bootstrap/containers/OriginationContainer";
import { AuthMiddleware } from "../../../../shared/middleware/AuthMiddleware";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ContratingRequest } from "../../domain/Request/OriginationContratingRequest";

export class OriginationContratingController {
  constructor() {}

      /** Origination - Contrating */
    async getContrating(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.Contrating.getContrating.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    async setContrating(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = AuthMiddleware.userLogged(req)
            const data = plainToInstance(ContratingRequest, req.body);
            const errors = await validate(data);   
            
            if (errors.length > 0) {
            return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.Contrating.setContrating.run(data, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }
    
}