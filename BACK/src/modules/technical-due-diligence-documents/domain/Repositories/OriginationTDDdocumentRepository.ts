import { TechnicalDueDiligenceRequest } from "../Request/OriginationTDDdocumentRequest";

export interface TechnicalDueDiligenceRepository {
  getTechnicalDueDiligence(idProject: number): Promise<any>;
  setTechnicalDueDiligence(data: TechnicalDueDiligenceRequest, userId: number): Promise<any>;
}