import { Request, Response, NextFunction } from 'express';
import { ServiceContainer } from '../shared/ServiceContainer';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserRequest } from '../modules/User/domain/CreateUserRequest';

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
      return res.status(400).json({ valido: 0, errors: "👀👀👀👀👀Error"});
    }

    await ServiceContainer.user.setUsers.run(user);
    return res.status(200).json({ valido: 1 });
  } catch (error) {
    next(error);
  }
}
}