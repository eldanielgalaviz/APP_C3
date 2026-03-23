import { Routes } from '@angular/router';

import { InBodyComponent } from './shared/interno/in-body/in-body.component';
import { PuBodyComponent } from './shared/publico/pu-body/pu-body.component';

import { InicioComponent } from './pages/interno/inicio/inicio.component';
import { LoginComponent } from './pages/publico/login/login.component';
import { DashboardProjectComponent } from './pages/interno/dashboard-project/dashboard-project.component';
import { PortafolioComponent } from './pages/interno/portafolio/portafolio.component';
import { ProspectOnboardingComponent } from './pages/interno/MacroProcess/Origination/prospect-onboarding/prospect-onboarding.component';
import { FeasibilityComponent } from './pages/interno/MacroProcess/Origination/feasibility/feasibility.component';
import { LegalDueDiligenceComponent } from './pages/interno/MacroProcess/Origination/legal-due-diligence/legal-due-diligence.component';
import { ProjectApprovalComponent } from './pages/interno/MacroProcess/Origination/project-approval/project-approval.component';
import { LegalKYCComponent } from './pages/interno/MacroProcess/Origination/legal-kyc/legal-kyc.component';
import { TransactionApprovalComponent } from './pages/interno/MacroProcess/Origination/transaction-approval/transaction-approval.component';
import { ContractingComponent } from './pages/interno/MacroProcess/Origination/contracting/contracting.component';
import { TechnicalDueDiligenceComponent } from './pages/interno/MacroProcess/Origination/technical-due-diligence/technical-due-diligence.component';
import { AuthGuard } from '../service/guards/AuthGuard.service';
import { ToolsComponent } from './pages/interno/tools/tools.component';
import { AccountsTlsComponent } from './pages/segurity/accounts-tls/accounts-tls.component';
import { ActivitiesTlsComponent } from './pages/segurity/activities-tls/activities-tls.component';
import { AdjtypesTlsComponent } from './pages/segurity/adjtypes-tls/adjtypes-tls.component';
import { EvSettlementTlsComponent } from './pages/segurity/ev-settlement-tls/ev-settlement-tls.component';
import { EvSubacountsTlsComponent } from './pages/segurity/ev-subacounts-tls/ev-subacounts-tls.component';
import { EvidencesTlsComponent } from './pages/segurity/evidences-tls/evidences-tls.component';
import { IndicadorsTlsComponent } from './pages/segurity/indicadors-tls/indicadors-tls.component';
import { MilestoneTlsComponent } from './pages/segurity/milestone-tls/milestone-tls.component';
import { PerfilesTlsComponent } from './pages/segurity/perfiles-tls/perfiles-tls.component';
import { SopTlsComponent } from './pages/segurity/sop-tls/sop-tls.component';
import { SubaccountsTlsComponent } from './pages/segurity/subaccounts-tls/subaccounts-tls.component';
import { SubprocessTlsComponent } from './pages/segurity/subprocess-tls/subprocess-tls.component';
import { UsersTlsComponent } from './pages/segurity/users-tls/users-tls.component';

export const routes: Routes = [

    {
        path: '', component: PuBodyComponent,
        children: [
            {
                path: '',
                component: LoginComponent,
                canActivate: [AuthGuard]
            },
        ]
    },

    {
        path: '', component: InBodyComponent,
        children: [
            //inicia menu nav interno
            {
                path: 'Inicio',//dashboard general
                component: InicioComponent,
            },
            //----------INICIA  tools segurity--------------------
            {
                path: 'tools', component: ToolsComponent,
                children: [
                    {
                        path: '',
                        component: AccountsTlsComponent,
                    },
                    {
                        path: 'ToolsActivities',
                        component: ActivitiesTlsComponent,
                    },
                    {
                        path: 'ToolsAdjtypes',
                        component: AdjtypesTlsComponent,
                    },
                    {
                        path: 'ToolsEvSettlement',
                        component: EvSettlementTlsComponent,
                    },
                    {
                        path: 'ToolsEvSubacounts',
                        component: EvSubacountsTlsComponent,
                    },
                    {
                        path: 'ToolsEvidences',
                        component: EvidencesTlsComponent,
                    },
                    {
                        path: 'ToolsIndicadors',
                        component: IndicadorsTlsComponent,
                    },
                    {
                        path: 'ToolsMilestone',
                        component: MilestoneTlsComponent,
                    },
                    {
                        path: 'ToolsPerfiles',
                        component: PerfilesTlsComponent,
                    },
                    {
                        path: 'ToolsSop',
                        component: SopTlsComponent,
                    },
                    {
                        path: 'ToolsSubaccounts',
                        component: SubaccountsTlsComponent,
                    },
                    {
                        path: 'ToolsSubprocess',
                        component: SubprocessTlsComponent,
                    },
                    {
                        path: 'ToolsUsers',
                        component: UsersTlsComponent
                    },
                ]
            },
            //-----------------------------------------------------------------------
            //inicia el compartido del menu de portafolio
            {
                path: 'portafolio', component: PortafolioComponent,
                children: [
                    //origination
                    {
                        path: '',
                        component: DashboardProjectComponent,
                    },
                    {
                        path: 'prospect',
                        component: ProspectOnboardingComponent,
                    },
                    {
                        path: 'feasibility',
                        component: FeasibilityComponent,
                    },
                    {
                        path: 'legal',
                        component: LegalDueDiligenceComponent,
                    },
                    {
                        path: 'technical',
                        component: TechnicalDueDiligenceComponent,
                    },
                    {
                        path: 'approval',
                        component: ProjectApprovalComponent,
                    },
                    {
                        path: 'kyc',
                        component: LegalKYCComponent,
                    },
                    {
                        path: 'transaction',
                        component: TransactionApprovalComponent,
                    },
                    {
                        path: 'contrating',
                        component: ContractingComponent,
                    },

                ]
            },

        ],
        canActivate: [AuthGuard]
    },




];

