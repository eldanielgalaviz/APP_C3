import { Routes } from '@angular/router';

import { InBodyComponent } from './shared/interno/in-body/in-body.component';
import { PuBodyComponent } from './shared/publico/pu-body/pu-body.component';

import { AuthGuard } from '../service/guards/AuthGuard.service';


export const routes: Routes = [

    {
        path: '', component: PuBodyComponent,
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./pages/publico/login/login.component')
                        .then(m => m.LoginComponent),
                canActivate: [AuthGuard],
            },
        ]
    },

    {
        path: '', component: InBodyComponent,
        canActivate: [AuthGuard],
        children: [
            //inicia menu nav interno
            {
                path: 'Inicio',
                loadComponent: () =>
                    import('./pages/interno/inicio/inicio.component')
                        .then(m => m.InicioComponent),
            },
            //----------INICIA  tools segurity--------------------
            {
                path: 'tools',
                loadComponent: () =>
                    import('./pages/interno/tools/tools.component')
                        .then(m => m.ToolsComponent),
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import('./pages/segurity/accounts-tls/accounts-tls.component')
                                .then(m => m.AccountsTlsComponent),
                    },
                    {
                        path: 'ToolsActivities',
                        loadComponent: () =>
                            import('./pages/segurity/activities-tls/activities-tls.component')
                                .then(m => m.ActivitiesTlsComponent),
                    },
                    {
                        path: 'ToolsAdjtypes',
                        loadComponent: () =>
                            import('./pages/segurity/adjtypes-tls/adjtypes-tls.component')
                                .then(m => m.AdjtypesTlsComponent),
                    },
                    {
                        path: 'ToolsEvSubacounts',
                        loadComponent: () =>
                            import('./pages/segurity/ev-subacounts-tls/ev-subacounts-tls.component')
                                .then(m => m.EvSubacountsTlsComponent),
                    },
                    {
                        path: 'ToolsEvidences',
                        loadComponent: () =>
                            import('./pages/segurity/evidences-tls/evidences-tls.component')
                                .then(m => m.EvidencesTlsComponent),
                    },
                    {
                        path: 'ToolsIndicadors',
                        loadComponent: () =>
                            import('./pages/segurity/indicadors-tls/indicadors-tls.component')
                                .then(m => m.IndicadorsTlsComponent),
                    },
                    {
                        path: 'ToolsMilestone',
                        loadComponent: () =>
                            import('./pages/segurity/milestone-tls/milestone-tls.component')
                                .then(m => m.MilestoneTlsComponent),
                    },
                    {
                        path: 'ToolsPerfiles',
                        loadComponent: () =>
                            import('./pages/segurity/perfiles-tls/perfiles-tls.component')
                                .then(m => m.PerfilesTlsComponent),
                    },
                    {
                        path: 'ToolsSop',
                        loadComponent: () =>
                            import('./pages/segurity/sop-tls/sop-tls.component')
                                .then(m => m.SopTlsComponent),
                    },
                    {
                        path: 'ToolsSubaccounts',
                        loadComponent: () =>
                            import('./pages/segurity/subaccounts-tls/subaccounts-tls.component')
                                .then(m => m.SubaccountsTlsComponent),
                    },
                    {
                        path: 'ToolsSubprocess',
                        loadComponent: () =>
                            import('./pages/segurity/subprocess-tls/subprocess-tls.component')
                                .then(m => m.SubprocessTlsComponent),
                    },
                    {
                        path: 'ToolsMenu',
                        loadComponent: () =>
                            import('./pages/segurity/menus.tls/menus.tls.component')
                                .then(m => m.MenusTlsComponent),
                    },
                    {
                        path: 'ToolsUsers',
                        loadComponent: () =>
                            import('./pages/segurity/users-tls/users-tls.component')
                                .then(m => m.UsersTlsComponent),
                    },
                ],
            },
            //-----------------------------------------------------------------------
            //inicia el compartido del menu de portafolio
            {
                path: 'portafolio',
                loadComponent: () =>
                    import('./pages/interno/portafolio/portafolio.component')
                        .then(m => m.PortafolioComponent),
                children: [
                    //dash project
                    {
                        path: '',
                        loadComponent: () =>
                            import('./pages/interno/dashboard-project/dashboard-project.component')
                                .then(m => m.DashboardProjectComponent),
                    },
                    //origination
                    {
                        path: 'origination',
                        children: [
                            {
                                path: 'prospect',
                                loadComponent: () =>
                                    import('./pages/interno/MacroProcess/Origination/prospect-onboarding/prospect-onboarding.component')
                                        .then(m => m.ProspectOnboardingComponent),
                            },
                            {
                                path: 'feasibility',
                                loadComponent: () =>
                                    import('./pages/interno/MacroProcess/Origination/feasibility/feasibility.component')
                                        .then(m => m.FeasibilityComponent),
                            },
                            {
                                path: 'legal',
                                loadComponent: () =>
                                    import('./pages/interno/MacroProcess/Origination/legal-due-diligence/legal-due-diligence.component')
                                        .then(m => m.LegalDueDiligenceComponent),
                            },
                            {
                                path: 'technical',
                                loadComponent: () =>
                                    import('./pages/interno/MacroProcess/Origination/technical-due-diligence/technical-due-diligence.component')
                                        .then(m => m.TechnicalDueDiligenceComponent),
                            },
                            {
                                path: 'approval',
                                loadComponent: () =>
                                    import('./pages/interno/MacroProcess/Origination/project-approval/project-approval.component')
                                        .then(m => m.ProjectApprovalComponent),
                            },
                            {
                                path: 'kyc',
                                loadComponent: () =>
                                    import('./pages/interno/MacroProcess/Origination/legal-kyc/legal-kyc.component')
                                        .then(m => m.LegalKycComponent),
                            },
                            {
                                path: 'transaction',
                                loadComponent: () =>
                                    import('./pages/interno/MacroProcess/Origination/transaction-approval/transaction-approval.component')
                                        .then(m => m.TransactionApprovalComponent),
                            },
                            {
                                path: 'contrating',
                                loadComponent: () =>
                                    import('./pages/interno/MacroProcess/Origination/contracting/contracting.component')
                                        .then(m => m.ContractingComponent),
                            },
                        ],
                    },

                    //implementation

                    {
                        path: 'implementation',

                        children: [
                            {
                                path: 'pm-project',
                                loadComponent: () =>
                                    import('./pages/interno/MacroProcess/implementation/assign-pm-to-project/assign-pm-to-project.component')
                                        .then(m => m.AssignPMToProjectComponent),
                            },
                            {
                                path: 'listing',
                                loadComponent: () =>
                                    import('./pages/interno/MacroProcess/implementation/listing/listing.component')
                                        .then(m => m.ListingComponent),
                            },
                            {
                                path: 'baseline',
                                loadComponent: () =>
                                    import('./pages/interno/MacroProcess/implementation/baseline/baseline.component')
                                        .then(m => m.BaselineComponent),
                            },
                            {
                                path: 'strategic-planning',
                                loadComponent: () =>
                                    import('./pages/interno/MacroProcess/implementation/strategic-planning/strategic-planning.component')
                                        .then(m => m.StrategicPlanningComponent),
                            },
                            {
                                path: 'annual-planning',
                                children: [
                                    {
                                        path: '',
                                        loadComponent: () =>
                                            import('./pages/interno/MacroProcess/implementation/annual-planning/annual-planning.component')
                                                .then(m => m.AnnualPlanningComponent),
                                    },
                                    {
                                        path: 'activity-planning',
                                        loadComponent: () =>
                                            import('./pages/interno/MacroProcess/implementation/annual-planning/pl-activities/pl-new-activity/pl-new-activity.component')
                                                .then(m => m.PlNewActivityComponent),
                                    },
                                    {
                                        path: 'view-planning',
                                        loadComponent: () =>
                                            import('./pages/interno/MacroProcess/implementation/annual-planning/pl-view-plan/pl-view-plan.component')
                                                .then(m => m.PlViewPlanComponent),
                                    },
                                ],
                            },
                            {
                                path: 'financial-monitoring',
                                loadComponent: () =>
                                    import('./pages/interno/MacroProcess/implementation/execution-and-monitoring/execution-and-monitoring.component')
                                        .then(m => m.ExecutionAndMonitoringComponent),
                            },
                            {
                                path: 'trainning',
                                loadComponent: () =>
                                    import('./pages/interno/MacroProcess/implementation/trainning/trainning.component')
                                        .then(m => m.TrainningComponent),
                            },
                            {
                                path: 'activity-monitoring',
                                children: [
                                    {
                                        path: '',
                                        loadComponent: () =>
                                            import('./pages/interno/MacroProcess/implementation/activity-monitoring/am-table-reports/am-table-reports.component')
                                                .then(m => m.AmTableReportsComponent),
                                    },
                                    {
                                        path: 'activity-report-view',
                                        loadComponent: () =>
                                            import('./pages/interno/MacroProcess/implementation/activity-monitoring/am-report-view/am-report-view.component')
                                                .then(m => m.AmReportViewComponent),
                                    },

                                ],
                            },
                            {
                                path: 'review',
                                loadComponent: () =>
                                    import('./pages/interno/MacroProcess/implementation/review/review.component')
                                        .then(m => m.ReviewComponent),
                            },
                        ],
                    },





                    //settlement
                    {
                        path: 'settlement-planning',
                        loadComponent: () =>
                            import('./pages/interno/MacroProcess/settlement/planning-stt/planning-stt.component')
                                .then(m => m.PlanningSttComponent),
                    },
                ],

            },

        ],
    },




];

