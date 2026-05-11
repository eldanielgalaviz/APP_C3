import { PedRequest } from "../Request/OriginationPEDRequest";

export interface PedRepository {
  getPedRepository(idProject: number): Promise<PedRequest>;
  setPedRepository(data: PedRequest, userId: number): Promise<PedRequest>;
}