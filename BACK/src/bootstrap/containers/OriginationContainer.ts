import { getOrigination, getProjects } from "../../modules/origination/application/get/getOrigination";
import { getActivityArea } from "../../modules/feasibility-activity-area/application/get/getOriginationActivityArea";
import { getCbaImport } from "../../modules/technical-due-diligence-cba/application/get/getOriginationCbaImport";
import { getCDREstimation } from "../../modules/feasibility-cdr-estimation/application/get/getOriginationCDREstimation";
import { getContrating } from "../../modules/contrating/application/get/getOriginationContrating";
import { getLegalDueDiligence } from "../../modules/legal-due-diligence/application/get/getOriginationLegalDueDiligence";
import { getLegalKYC } from "../../modules/legal-kyc/application/get/getOriginationLegalKyc";
import { getPed } from "../../modules/feasibility-ped/application/get/getOriginationPed";
import { getPrePinAssumptions } from "../../modules/feasibility-pre-pin-assumptions/application/get/getOriginationPrePinAssumptions";
import { getProjectApproval } from "../../modules/project-approval/application/get/getOriginationProjectApproval";
import { getProjectAreas } from "../../modules/feasibility-project-area/application/get/getOriginationProjectAreas";
import { getTeamAndPlans } from "../../modules/feasibility-team-plan/application/get/getOriginationTeamAndPlans";
import { getTransactionApproval } from "../../modules/transaction-approval/application/get/getOriginationTransactionApproval";
import { setCbaImport } from "../../modules/technical-due-diligence-cba/application/set/setCbaImport";
import { setOrigination } from "../../modules/origination/application/set/setOrigination";
import { setActivityArea } from "../../modules/feasibility-activity-area/application/set/setOriginationActivityArea";
import { setCDREstimation } from "../../modules/feasibility-cdr-estimation/application/set/setOriginationCDREstimation";
import { setContrating } from "../../modules/contrating/application/set/setOriginationContrating";
import { setLegalDueDiligence } from "../../modules/legal-due-diligence/application/set/setOriginationLegalDueDiligence";
import { setLegalKYC } from "../../modules/legal-kyc/application/set/setOriginationLegalKyc";
import { setPedOrigination } from "../../modules/feasibility-ped/application/set/setPedOrigination";
import { setPedSig } from "../../modules/feasibility-ped/application/set/setPedSig";
import { setPrePinOrigination } from "../../modules/feasibility-pre-pin-assumptions/application/set/setPrePinOrigination";
import { setPrePinMrv } from "../../modules/feasibility-pre-pin-assumptions/application/set/setPrePinMrv";
import { setPrePinSafeguards } from "../../modules/feasibility-pre-pin-assumptions/application/set/setPrePinSafeguards";
import { setProjectApproval } from "../../modules/project-approval/application/set/setOriginationProjectApproval";
import { setProjectAreas } from "../../modules/feasibility-project-area/application/set/setOriginationProjectAreas";
import { setTeamAndPlans } from "../../modules/feasibility-team-plan/application/set/setOriginationTeamAndPlans";
import { setTransactionApproval } from "../../modules/transaction-approval/application/set/setOriginationTransactionApproval";
import { CbaImportRepositoryImpl } from "../../modules/technical-due-diligence-cba/infraestructure/repositories/OriginationCbaImportRepositoryImpl";
import { CDRRepositoryEstimationImpl } from "../../modules/feasibility-cdr-estimation/infraestructure/repositories/OriginationCDRRepositoryImpl";
import { ContratingRepositoryImpl } from "../../modules/contrating/infraestructure/repository/OriginationContratingRepositoryImpl";
import { LegalKYCRepositoryImpl } from "../../modules/legal-kyc/infraestructure/repositories/OriginationLegalKycRepositoryImpl";
import { PedRepositoryImpl } from "../../modules/feasibility-ped/infraestructure/repositories/OriginationPedRepositoryImpl";
import { PrePinAssumptionsRepositoryImpl } from "../../modules/feasibility-pre-pin-assumptions/infraestructure/repositories/OriginationPrePinAssumptionsRepositoryImpl";
import { ProjectApprovalRepositoryImpl } from "../../modules/project-approval/infraestructure/repositories/OriginationProjectApprovalRepositoryImpl";
import { ProjectAreasImpl } from "../../modules/feasibility-project-area/infraestructure/repositories/OriginationProjectAreasRepositoryImpl";
import { getOverview } from "../../modules/origination/application/get/getOriginationOverview";
import { OverviewRepositoryImpl } from "../../modules/origination/infraestructure/repository/OriginationOverviewRepositoryImpl";


import { OriginationRepositoryImpl, ProjectsRepositoryImpl } from "../../modules/origination/infraestructure/repository/OriginationRepositoryImpl";
import { OriginationSmeAreaRepositoryImpl } from "../../modules/origination/infraestructure/repository/OriginationSmeAreaRepositoryImpl";
import { TeamAndPlansRepositoryImpl } from "../../modules/feasibility-team-plan/infraestructure/infraestructure/OriginationTeamAndPlansRepositoryImpl";
import { TransactionApprovalRepositoryImpl } from "../../modules/transaction-approval/infraestructure/repositories/OriginationTransactionApprovalRepositoryImpl";
import { getTechnicalDueDiligence } from "../../modules/technical-due-diligence-documents/application/get/getTechnicalDueDiligence";
import { setTechnicalDueDiligence } from "../../modules/technical-due-diligence-documents/application/set/setTechnicalDueDiligence";
import { getMilestonesTDD } from "../../modules/origination/application/get/getOriginationTDD";
import { TechnicalDueDiligenceRepositoryImpl } from "../../modules/technical-due-diligence-documents/infraestructure/repositories/OriginationTechnicalDueDiligenceImpl";
import { LegalDueDiligenceRepositoryImpl } from "../../modules/legal-due-diligence/infraestructure/repositories/OriginationLegalDueDiligenceRepositoryImpl";
import { ActivityAreaRepositoryImpl } from "../../modules/feasibility-activity-area/infraestructure/repositories/OriginationActivityAreaRepositoryImpl";
import { getSmeArea } from "../../modules/origination/application/get/getOriginationSmeArea";

const originationRepository = new OriginationRepositoryImpl();
const CatalogSmeAreaRepository = new OriginationSmeAreaRepositoryImpl();

const teamAndPlansRepository = new TeamAndPlansRepositoryImpl();
const prePinAssumptionsRepository = new PrePinAssumptionsRepositoryImpl();
const ProjectAreasRepository = new ProjectAreasImpl();
const activityAreaRepository = new ActivityAreaRepositoryImpl();
const cdrEstimation = new CDRRepositoryEstimationImpl();
const pedRepository = new PedRepositoryImpl();
const leadDueDiligenceRepository = new LegalDueDiligenceRepositoryImpl();
const projectApprovalRepository = new ProjectApprovalRepositoryImpl();
const transactionApprovalRepository = new TransactionApprovalRepositoryImpl();
const LegalKYCRepository = new LegalKYCRepositoryImpl();
const ContratingRepository = new ContratingRepositoryImpl();
const CbaImportRepository = new CbaImportRepositoryImpl();
const projectsRepository = new ProjectsRepositoryImpl();
const overviewRepository = new OverviewRepositoryImpl();
const technicalDueDiligenceRepository = new TechnicalDueDiligenceRepositoryImpl();

export { 
         originationRepository, 
         CatalogSmeAreaRepository,
         teamAndPlansRepository, 
         prePinAssumptionsRepository, 
         ProjectAreasRepository, 
         projectsRepository, 
         activityAreaRepository, 
         leadDueDiligenceRepository, 
         projectApprovalRepository, 
         transactionApprovalRepository,
         technicalDueDiligenceRepository
      };

export const originationContainer = {
    setOrigination: new setOrigination(originationRepository),
    getOrigination: new getOrigination(originationRepository),
    getSmeArea: new getSmeArea(CatalogSmeAreaRepository),

    teamAndPlans: {
      getTeamAndPlans: new getTeamAndPlans(teamAndPlansRepository),
      setTeamAndPlans: new setTeamAndPlans(teamAndPlansRepository),
    },
      prePinAssumptions: {
      getPrePinAssumptions: new getPrePinAssumptions(prePinAssumptionsRepository),
      setPrePinOrigination:  new setPrePinOrigination(prePinAssumptionsRepository),
      setPrePinMrv:          new setPrePinMrv(prePinAssumptionsRepository),
      setPrePinSafeguards:   new setPrePinSafeguards(prePinAssumptionsRepository),
    },
    projectAreas: {
      getProjectAreas: new getProjectAreas(ProjectAreasRepository),
      setProjectAreas: new setProjectAreas(ProjectAreasRepository),
    },
    projects: {
      getProjects: new getProjects(projectsRepository),
    },
    ActivityArea: {
      getActivityArea: new getActivityArea(activityAreaRepository),
      setActivityArea: new setActivityArea(activityAreaRepository),
    },
    ped: {
      getPed:            new getPed(pedRepository),
      setPedOrigination: new setPedOrigination(pedRepository),
      setPedSig:         new setPedSig(pedRepository),
    },
    technicalDueDiligence: {
      getTechnicalDueDiligence: new getTechnicalDueDiligence(technicalDueDiligenceRepository),
      setTechnicalDueDiligence: new setTechnicalDueDiligence(technicalDueDiligenceRepository),
      catalogs: {
      }
    },
    CDREstimation: {
      getCDREstimation: new getCDREstimation(cdrEstimation),
      setCDREstimation: new setCDREstimation(cdrEstimation),
    },
    LegalDueDiligence: {
      getLegalDueDiligence: new getLegalDueDiligence(leadDueDiligenceRepository),
      setLegalDueDiligence: new setLegalDueDiligence(leadDueDiligenceRepository),
    },
    ProjectApproval: {
      getProjectApproval: new getProjectApproval(projectApprovalRepository),
      setProjectApproval: new setProjectApproval(projectApprovalRepository),
    },
    TransactionApproval: {
      getTransactionApproval: new getTransactionApproval(transactionApprovalRepository),
      setTransactionApproval: new setTransactionApproval(transactionApprovalRepository),
    },
    LegalKYC: {
      getLegalKYC: new getLegalKYC(LegalKYCRepository),
      setLegalKYC: new setLegalKYC(LegalKYCRepository),
     },
    Contrating:{
      getContrating: new getContrating(ContratingRepository),
      setContrating: new setContrating(ContratingRepository),
    },
    CbaImport: {
      getCbaImport: new getCbaImport(CbaImportRepository),
      setCbaImport: new setCbaImport(CbaImportRepository),
    },
    Overview: {
      getOverview: new getOverview(overviewRepository),
    },

};