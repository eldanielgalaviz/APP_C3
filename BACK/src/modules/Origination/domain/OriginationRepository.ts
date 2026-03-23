import { OriginationRequest } from "./OriginationRequest";

/** importar los interfaces necesarios de originación */
export interface OriginationRepository {

  getOriginationRepository(idOrigination: number): Promise<OriginationRequest>;
  setOriginationRepository(origination: OriginationRequest): Promise<OriginationRequest>;
}