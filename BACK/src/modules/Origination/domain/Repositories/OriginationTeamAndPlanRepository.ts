import { TeamAndPlansRequest } from "../Request/OriginationTeamAndPlansRequest";

export interface TeamAndPlansRepository {
  getTeamAndPlansRepository(idProject: number): Promise<any>;
  setTeamAndPlansRepository(data: TeamAndPlansRequest, userId: number): Promise<any>;
}