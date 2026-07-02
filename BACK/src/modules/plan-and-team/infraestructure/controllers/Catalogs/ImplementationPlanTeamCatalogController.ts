import { NextFunction, Request, Response } from 'express';
import { implementationContainer } from '../../../../../bootstrap/containers/ImplementationContainer';

export class PlanTeamCatalogController {
    constructor() {}

    async getProjectManagers(req: Request, res: Response, next: NextFunction){
        try {
            const getProjectManagers = await implementationContainer.planTeam.catalogs.getProjectManagers.run();
            return res.status(200).json({valido: 1, result: getProjectManagers});
        } catch (error) {
            next(error)
        }
    }

    async getSmes(req: Request, res: Response, next: NextFunction){
        try {
            const getSmes = await implementationContainer.planTeam.catalogs.getSmes.run();
            return res.status(200).json({valido: 1, result: getSmes});
        } catch (error) {
            next(error)
        }
    }
}