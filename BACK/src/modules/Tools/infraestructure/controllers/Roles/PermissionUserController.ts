import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ToolsPermissionUserRequest } from '../../../domain/Request/Roles/ToolsPermissionUserRequest';
import { toolsContainer } from '../../../../../bootstrap/containers/Tools/toolsContainer';
import { AuthMiddleware } from '../../../../../shared/middleware/AuthMiddleware';

export class PermissionUserController {
  constructor() {}

  async getPermissionUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await toolsContainer.Roles.getPermissionUser.run();
      return res.status(200).json({ valido: 1, result });
    } catch (error) {
      next(error);
    }
  }

  async setPermissionUser(req: Request, res: Response, next: NextFunction) {
    try {
      const catchUser = AuthMiddleware.userLogged(req);
      const data = plainToInstance(ToolsPermissionUserRequest, req.body);
      const errors = await validate(data);

      if (errors.length > 0) {
        return res.status(400).json({ valido: 0, errors: errors[0].constraints });
      }

      const result = await toolsContainer.Roles.setPermissionUser.run(data, catchUser);
      return res.status(200).json({ valido: 1, result });
    } catch (error) {
      next(error);
    }
  }
}