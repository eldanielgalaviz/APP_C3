import { getOrigination, getProjects } from "../../modules/Origination/Bin/application/get/getOrigination";
import { getActivityArea } from "../../modules/Origination/Bin/application/get/getOriginationActivityArea";
import { getCbaImport } from "../../modules/Origination/Bin/application/get/getOriginationCbaImport";
import { getCDREstimation } from "../../modules/Origination/Bin/application/get/getOriginationCDREstimation";
import { getContrating } from "../../modules/Origination/Bin/application/get/getOriginationContrating";
import { getLegalDueDiligence } from "../../modules/Origination/Bin/application/get/getOriginationLegalDueDiligence";
import { getLegalKYC } from "../../modules/Origination/Bin/application/get/getOriginationLegalKyc";
import { getPed } from "../../modules/Origination/Bin/application/get/getOriginationPed";
import { getPrePinAssumptions } from "../../modules/Origination/Bin/application/get/getOriginationPrePinAssumptions";
import { getProjectApproval } from "../../modules/Origination/Bin/application/get/getOriginationProjectApproval";
import { getProjectAreas } from "../../modules/Origination/Bin/application/get/getOriginationProjectAreas";
import { getTeamAndPlans } from "../../modules/Origination/Bin/application/get/getOriginationTeamAndPlans";
import { getTransactionApproval } from "../../modules/Origination/Bin/application/get/getOriginationTransactionApproval";
import { setCbaImport } from "../../modules/Origination/Bin/application/set/setCbaImport";
import { setOrigination } from "../../modules/Origination/Bin/application/set/setOrigination";
import { setActivityArea } from "../../modules/Origination/Bin/application/set/setOriginationActivityArea";
import { setCDREstimation } from "../../modules/Origination/Bin/application/set/setOriginationCDREstimation";
import { setContrating } from "../../modules/Origination/Bin/application/set/setOriginationContrating";
import { setLegalDueDiligence } from "../../modules/Origination/Bin/application/set/setOriginationLegalDueDiligence";
import { setLegalKYC } from "../../modules/Origination/Bin/application/set/setOriginationLegalKyc";
import { setPed } from "../../modules/Origination/Bin/application/set/setOriginationPed";
import { setPrePinAssumptions } from "../../modules/Origination/Bin/application/set/setOriginationPrePinAssumptions";
import { setProjectApproval } from "../../modules/Origination/Bin/application/set/setOriginationProjectApproval";
import { setProjectAreas } from "../../modules/Origination/Bin/application/set/setOriginationProjectAreas";
import { setTeamAndPlans } from "../../modules/Origination/Bin/application/set/setOriginationTeamAndPlans";
import { setTransactionApproval } from "../../modules/Origination/Bin/application/set/setOriginationTransactionApproval";
import { ActivityAreaRepositoryImpl } from "../../modules/Origination/infraestructure/repository/OriginationActivityAreaRepositoryImpl";
import { CbaImportRepositoryImpl } from "../../modules/Origination/infraestructure/repository/OriginationCbaImportRepositoryImpl";
import { CDRRepositoryEstimationImpl } from "../../modules/Origination/infraestructure/repository/OriginationCDRRepositoryImpl";
import { ContratingRepositoryImpl } from "../../modules/Origination/infraestructure/repository/OriginationContratingRepositoryImpl";
import { LeadDueDiligenceRepositoryImpl } from "../../modules/Origination/infraestructure/repository/OriginationLeadDueDiligenceRepositoryImpl";
import { LegalKYCRepositoryImpl } from "../../modules/Origination/infraestructure/repository/OriginationLegalKycRepositoryImpl";
import { PedRepositoryImpl } from "../../modules/Origination/infraestructure/repository/OriginationPedRepositoryImpl";
import { PrePinAssumptionsRepositoryImpl } from "../../modules/Origination/infraestructure/repository/OriginationPrePinAssumptionsRepositoryImpl";
import { ProjectApprovalRepositoryImpl } from "../../modules/Origination/infraestructure/repository/OriginationProjectApprovalRepositoryImpl";
import { ProjectAreasImpl } from "../../modules/Origination/infraestructure/repository/OriginationProjectAreasRepositoryImpl";

import { OriginationRepositoryImpl, ProjectsRepositoryImpl } from "../../modules/Origination/infraestructure/repository/OriginationRepositoryImpl";
import { TeamAndPlansRepositoryImpl } from "../../modules/Origination/infraestructure/repository/OriginationTeamAndPlansRepositoryImpl";
import { TransactionApprovalRepositoryImpl } from "../../modules/Origination/infraestructure/repository/OriginationTransactionApprovalRepositoryImpl";

const originationRepository = new OriginationRepositoryImpl();
const teamAndPlansRepository = new TeamAndPlansRepositoryImpl();
const prePinAssumptionsRepository = new PrePinAssumptionsRepositoryImpl();
const ProjectAreasRepository = new ProjectAreasImpl();
const activityAreaRepository = new ActivityAreaRepositoryImpl();
const cdrEstimation = new CDRRepositoryEstimationImpl();
const pedRepository = new PedRepositoryImpl();
const leadDueDiligenceRepository = new LeadDueDiligenceRepositoryImpl();
const projectApprovalRepository = new ProjectApprovalRepositoryImpl();
const transactionApprovalRepository = new TransactionApprovalRepositoryImpl();
const LegalKYCRepository = new LegalKYCRepositoryImpl();
const ContratingRepository = new ContratingRepositoryImpl();
const CbaImportRepository = new CbaImportRepositoryImpl();
const projectsRepository = new ProjectsRepositoryImpl();

export { 
         originationRepository, 
         teamAndPlansRepository, 
         prePinAssumptionsRepository, 
         ProjectAreasRepository, 
         projectsRepository, 
         activityAreaRepository, 
         leadDueDiligenceRepository, 
         projectApprovalRepository, 
         transactionApprovalRepository 
      };

export const originationContainer = {
    setOrigination: new setOrigination(originationRepository),
    getOrigination: new getOrigination(originationRepository),
    teamAndPlans: {
      getTeamAndPlans: new getTeamAndPlans(teamAndPlansRepository),
      setTeamAndPlans: new setTeamAndPlans(teamAndPlansRepository),
    },
      prePinAssumptions: {
      getPrePinAssumptions: new getPrePinAssumptions(prePinAssumptionsRepository),
      setPrePinAssumptions: new setPrePinAssumptions(prePinAssumptionsRepository),
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
    ped:{
      getPed: new getPed(pedRepository),
      setPed: new setPed(pedRepository),
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
    }

};