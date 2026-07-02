import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserRequest } from '../../domain/CreateUserRequest';
import { ServiceContainer } from '../../../../bootstrap/containers/ServiceContainer';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { BlobService } from '../../../../shared/storage/functionsStorage';

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
            const catchUser = AuthMiddleware.userLogged(req)
            const users = await ServiceContainer.user.getUserMenu.run(catchUser);
            return res.status(200).json({valido: 1, result: users});
        } catch (error) {
            next(error)
        }
    }

    async setUserProfileImage(req: Request, res: Response, next: NextFunction) {
      try {
        const blobService = new BlobService();
        const catchUser = AuthMiddleware.userLogged(req)

        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        if (!files || !files['profileImage'] || files['profileImage'].length === 0) {
            return res.status(400).json({ valido: 0, message: 'No se ha proporcionado una imagen de perfil' });
        }

        const userImage = files?.profileImage?.[0];
        const blobpath = `profile_gallery/${userImage.originalname}`;

        const userImageUrl = await blobService.uploadUserProfileImage(userImage, blobpath);
        
        const result = await ServiceContainer.user.setUserProfileImage.run({ p_IdUser: catchUser, p_url_img: userImageUrl.blobName });
        return res.status(200).json({ valido: 1, result });
      } catch (error) {
        next(error);
      }
    }

    async getUserProfileImage(req: Request, res: Response, next: NextFunction) {
        try {
            const blobService = new BlobService();
            const catchUser = AuthMiddleware.userLogged(req)
            const result = await ServiceContainer.user.getUserProfileImage.run(catchUser);
            const urlFinal = blobService.getFileSasUrl(result[0].url_img);

            return res.status(200).json({ valido: 1, result: urlFinal });
        } catch (error) {
            next(error);
        }
    }
}