import { PedOriginationRequest, PedSigRequest } from "../Request/OriginationPEDRequest";

export interface PedRepository {
  getPedRepository(idProject: number): Promise<any>;
  setPedOriginationRepository(data: PedOriginationRequest, userId: number): Promise<any>;
  setPedSigRepository(data: PedSigRequest, userId: number): Promise<any>;
}