import { asyncWrapper } from '../../../../utils/asyncWrapper';
import { Router } from 'express';
import { OriginationController } from '../../../../controllers/OriginationControllers/OriginationController';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { uploadFields, uploadPedFields } from '../../../../shared/middleware/projectAreaMiddleware';

export class OriginationRoutes {
  static register(router: Router): void {
    const authRouter = Router();
    router.use('/origination', authRouter);

    const controller = new OriginationController();

    authRouter.get('/getOrigination/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getOrigination));
    authRouter.post('/setOrigination', AuthMiddleware.authenticate, asyncWrapper(controller.setOrigination));
    authRouter.get('/getTeamandplans/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getTeamAndPlans));
    authRouter.post('/setTeamandplans', AuthMiddleware.authenticate, asyncWrapper(controller.setTeamAndPlans));
    authRouter.get('/getPrePinAssumptions/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getPrePinAssumptions));
    authRouter.post('/setPrePinAssumptions', AuthMiddleware.authenticate, asyncWrapper(controller.setPrePinAssumptions));
    authRouter.get('/getProjectAreas/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getProjectAreas));
    authRouter.post('/setProjectAreas', AuthMiddleware.authenticate, uploadFields, asyncWrapper(controller.setProjectAreas));
    authRouter.post('/getFileWithPath', AuthMiddleware.authenticate, uploadFields, asyncWrapper(controller.getFileWithPath));
    authRouter.get('/getProjects', AuthMiddleware.authenticate, asyncWrapper(controller.getProjects));
    authRouter.get('/getActivityArea/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getActivityArea));
    authRouter.post('/setActivityArea', AuthMiddleware.authenticate, asyncWrapper(controller.setActivityArea)); 
    authRouter.post('/setPed', AuthMiddleware.authenticate, uploadPedFields, asyncWrapper(controller.setPed)); 
    authRouter.get('/getPed/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getPed)); 
    authRouter.get('/getCDREstimation/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getCDREstimation)); 
    authRouter.post('/setCDREstimation', AuthMiddleware.authenticate, asyncWrapper(controller.setCDREstimation)); 
    authRouter.get('/getLegalDueDiligence/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getLegalDueDiligence)); 
    authRouter.post('/setLegalDueDiligence', AuthMiddleware.authenticate, asyncWrapper(controller.setLegalDueDiligence));
    authRouter.get('/getProjectApproval/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getProjectApproval));
    authRouter.post('/setProjectApproval', AuthMiddleware.authenticate, asyncWrapper(controller.setProjectApproval));
    authRouter.get('/getTransactionApproval/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getTransactionApproval));
    authRouter.post('/setTransactionApproval', AuthMiddleware.authenticate, asyncWrapper(controller.setTransactionApproval));
    authRouter.get('/getLegalKYC/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getLegalKYC));
    authRouter.post('/setLegalKYC', AuthMiddleware.authenticate, asyncWrapper(controller.setLegalKYC));
    authRouter.get('/getContrating/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getContrating));
    authRouter.post('/setContrating', AuthMiddleware.authenticate, asyncWrapper(controller.setContrating));
    authRouter.post('/setCBAimport', AuthMiddleware.authenticate, asyncWrapper(controller.setCbaImport));
    authRouter.get('/getCbaImport/:id', AuthMiddleware.authenticate, asyncWrapper(controller.getCbaImport));

  }
}