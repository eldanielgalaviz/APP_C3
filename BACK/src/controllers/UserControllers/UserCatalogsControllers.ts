import { NextFunction, Request, Response } from 'express';
import { ServiceContainer } from "../../shared/ServiceContainer";

export class UsersCatalogController {
  constructor() {}

    private getCatalog = async (tableName: string, res: Response, next: NextFunction) => {
        try {
        const result = await ServiceContainer.user.catalogs.getUserCatalogs.run(tableName);
        return res.status(200).json({ valido: 1, result });
        } catch (error) {
        next(error);
        }
    }

    ct_department = async (req: Request, res: Response, next: NextFunction) => {
        return this.getCatalog('ct_department', res, next);
    }

    ct_position_user = async (req: Request, res: Response, next: NextFunction) => {
        return this.getCatalog('ct_position_user', res, next);
    }
}