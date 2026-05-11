import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserRequest } from '../../modules/User/domain/CreateUserRequest';
import { CatchUserLogged } from '../../shared/middleware/CatchUserMiddleware';
import { ServiceContainer } from '../../shared/ServiceContainer';

export class UserController {
    async getUsers(req: Request, res: Response, next: NextFunction){
        try {
            const users = await ServiceContainer.user.getUsers.run();
            return res.status(200).json({valido: 1, result: users});
        } catch (error) {
            next(error)
        }
    }

    async setUsers(req: Request, res: Response, next: NextFunction) {
      try {
        const user = plainToInstance(CreateUserRequest, req.body);
        const errors = await validate(user);
        
        if (errors.length > 0) {
          return res.status(400).json({ valido: 0, errors: errors});
        }

        await ServiceContainer.user.setUsers.run(user);
        return res.status(200).json({ valido: 1 });
      } catch (error) {
        next(error);
      }
    }

    async getUserMenu(req: Request, res: Response, next: NextFunction){
        try {
            const catchUser = CatchUserLogged.userLogged(req)
            const users = await ServiceContainer.user.getUserMenu.run(catchUser);
            return res.status(200).json({valido: 1, result: users});
        } catch (error) {
            next(error)
        }
    }
}