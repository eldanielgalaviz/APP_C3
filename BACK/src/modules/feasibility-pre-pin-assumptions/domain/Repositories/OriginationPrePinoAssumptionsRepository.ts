import { PrePinOriginationRequest } from "../Request/OriginationPreAssumptionsRequest";
import { PrePinMrvRequest } from "../Request/OriginationPreAssumptionsRequest";
import { PrePinSafeguardsRequest } from "../Request/OriginationPreAssumptionsRequest";

export interface PrePinAssumptionsRepository {
  getPrePinAssumptionsRepository(idProject: number): Promise<any>;
  setPrePinOriginationRepository(data: PrePinOriginationRequest, userId: number): Promise<any>;
  setPrePinMrvRepository(data: PrePinMrvRequest, userId: number): Promise<any>;
  setPrePinSafeguardsRepository(data: PrePinSafeguardsRequest, userId: number): Promise<any>;
}