import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { PrePinOriginationRequest, PrePinMrvRequest, PrePinSafeguardsRequest } from '../../domain/Request/OriginationPreAssumptionsRequest';
import { originationContainer } from '../../../../bootstrap/containers/OriginationContainer';

export class OriginationPrePinAssumptionsController {
  constructor() {}

  async getPrePinAssumptions(req: Request, res: Response, next: NextFunction) {
    try {
      const idProject = Number(req.params.id);
      const result = await originationContainer.prePinAssumptions.getPrePinAssumptions.run(idProject);
      return res.status(200).json({ valido: 1, result });
    } catch (error) {
      next(error);
    }
  }

  async setPrePinOrigination(req: Request, res: Response, next: NextFunction) {
    try {
      const catchUser = AuthMiddleware.userLogged(req);
      const data = plainToInstance(PrePinOriginationRequest, req.body);
      const errors = await validate(data);
      if (errors.length > 0) {
        return res.status(400).json({ valido: 0, errors: errors[0].constraints });
      }
      const result = await originationContainer.prePinAssumptions.setPrePinOrigination.run(data, catchUser);
      return res.status(200).json({ valido: 1, result });
    } catch (error) {
      next(error);
    }
  }

  async setPrePinMrv(req: Request, res: Response, next: NextFunction) {
    try {
      const catchUser = AuthMiddleware.userLogged(req);
      const data = plainToInstance(PrePinMrvRequest, req.body);
      const errors = await validate(data);
      if (errors.length > 0) {
        return res.status(400).json({ valido: 0, errors: errors[0].constraints });
      }
      const result = await originationContainer.prePinAssumptions.setPrePinMrv.run(data, catchUser);
      return res.status(200).json({ valido: 1, result });
    } catch (error) {
      next(error);
    }
  }

  async setPrePinSafeguards(req: Request, res: Response, next: NextFunction) {
    try {
      const catchUser = AuthMiddleware.userLogged(req);
      const data = plainToInstance(PrePinSafeguardsRequest, req.body);
      const errors = await validate(data);
      if (errors.length > 0) {
        return res.status(400).json({ valido: 0, errors: errors[0].constraints });
      }
      const result = await originationContainer.prePinAssumptions.setPrePinSafeguards.run(data, catchUser);
      return res.status(200).json({ valido: 1, result });
    } catch (error) {
      next(error);
    }
  }
}