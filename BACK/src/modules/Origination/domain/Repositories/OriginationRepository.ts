import { OriginationRequest } from "../Request/OriginationRequest";

/** importar los interfaces necesarios de originación */
export interface OriginationRepository {

  getOriginationRepository(idOrigination: number): Promise<OriginationRequest>;
  setOriginationRepository(origination: OriginationRequest, userId: number): Promise<OriginationRequest>;
}

export interface ProjectsRepository {
  getProjectsRepository(): Promise<any>;
}