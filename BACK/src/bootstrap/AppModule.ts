// src/app/AppModule.ts
import { Application, Router } from 'express';
import { UserRoutes } from '../modules/user/infrastructure/routes/UserRoutes';
import { AuthRoutes } from '../modules/auth/infrastructure/routes/AuthRoutes';
import { OriginationRoutes } from '../modules/origination/infraestructure/routes/OriginationRoutes';
import { OriginationSmeAreaRoutes } from '../modules/origination/infraestructure/routes/OriginationSmeArea';
import { OriginationCatalogsRoutes } from '../modules/origination/infraestructure/routes/OriginationCatalogsRoutes';
import { UserCatalogRoutes } from '../modules/user/infrastructure/routes/UserCatalogsRoutes';
import { ToolRoutes } from '../modules/tools/infraestructure/routes/toolRoutes';
import { PermissionsRoutes } from '../modules/permissions/infraestructure/routes/PermissionsRoutes';
import { ImplementationPlanTeamRoutes } from '../modules/plan-and-team/infraestructure/routes/ImplementationRoutes';
import { OriginationContratingRoutes } from '../modules/contrating/infraestructure/routes/OriginationContratingRoutes';
import { OriginationTransactionApprovalRoutes } from '../modules/transaction-approval/infraestructure/routes/OriginationTransactionApprovalRoutes';
import { OriginationLegalKycRoutes } from '../modules/legal-kyc/infraestructure/routes/OriginationLegalKycRoutes';
import { OriginationProjectApprovalRoutes } from '../modules/project-approval/infraestructure/routes/OriginationProjectApprovalRoutes';
import { OriginationTDDRoutes } from '../modules/technical-due-diligence-documents/infraestructure/routes/OriginationTDDRoutes';
import { OriginationCbaImportRoutes } from '../modules/technical-due-diligence-cba/infraestructure/routes/OriginationCbaImportRoutes';
import { OriginationLegalDueDiligenceRoutes } from '../modules/legal-due-diligence/infraestructure/routes/OriginationLegalDueDiligenceRoutes';
import { OriginationCDREstimationRoutes } from '../modules/feasibility-cdr-estimation/infraestructure/routes/OriginationCDREstimationRoutes';
import { OriginationPEDRoutes } from '../modules/feasibility-ped/infraestructure/routes/OriginationPEDRoutes';
import { OriginationActivityAreaRoutes } from '../modules/feasibility-activity-area/infraestructure/routes/OriginationActivityAreaRoutes';
import { OriginationPrePinAssumptionsRoutes } from '../modules/feasibility-pre-pin-assumptions/infraestructure/routes/OriginationPrePinAssumptionsRoutes';
import { OriginationTeamPlansRoutes } from '../modules/feasibility-team-plan/infraestructure/routes/OriginationTeamAndPlansRoutes';
import { OriginationProjectAreaRoutes } from '../modules/feasibility-project-area/infraestructure/routes/OriginationProjectAreaRoutes';


export class AppModule {
  constructor(private readonly app: Application) {
    this.configureRoutes();
  }
  private configureRoutes(): void {
    // Crear un router principal
    const router = Router();
    // Montar todas las rutas bajo /api
    this.app.use('/api', router);
    // Registrar módulos de rutas
    AuthRoutes.register(router);   // Rutas: /auth/login, /auth/logout, etc.
    UserRoutes.register(router);
    ToolRoutes.register(router);
    PermissionsRoutes.register(router);
    UserCatalogRoutes.register(router);
    
    /** Origination */
    OriginationCatalogsRoutes.register(router); // All catalogs
    OriginationRoutes.register(router); // Prospect Onboarding
    OriginationSmeAreaRoutes.register(router);
    OriginationTeamPlansRoutes.register(router); // Feasibility - Team and Plan
    OriginationPrePinAssumptionsRoutes.register(router); // Feasibility - Pre Pin Assumptions
    OriginationProjectAreaRoutes.register(router); // Feasibility - Project Area
    OriginationActivityAreaRoutes.register(router); // Feasibility - Activity Area
    OriginationPEDRoutes.register(router); // Feasibility - PED
    OriginationCDREstimationRoutes.register(router); // Feasibility - CDR Estimation
    OriginationLegalDueDiligenceRoutes.register(router); // Legal Due Diligence
    OriginationTDDRoutes.register(router); // TDD - Documents
    OriginationCbaImportRoutes.register(router); // TDD - Cba imports
    OriginationProjectApprovalRoutes.register(router); // Project Approval
    OriginationLegalKycRoutes.register(router) // Legal KYC
    OriginationTransactionApprovalRoutes.register(router) // Transaccion Approval
    OriginationContratingRoutes.register(router); // Contrating

    /** Implementation */
    ImplementationPlanTeamRoutes.register(router); // Plan and team
  }
}