import { Router } from 'express';
import { PlanTeamRoutes } from './PlanTeam/PlanTeamRoutes';
import { PlanTeamCatalogsRoutes } from './PlanTeam/catalogs/PlanTeamRoutes';

export class ImplementationRoutes {
  static register(router: Router): void {
    const implementationRouter = Router();

    router.use('/Implementation', implementationRouter);

    PlanTeamRoutes.register(implementationRouter);
    PlanTeamCatalogsRoutes.register(implementationRouter);
  }
}