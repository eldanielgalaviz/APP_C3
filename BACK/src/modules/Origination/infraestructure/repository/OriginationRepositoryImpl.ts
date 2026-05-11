import { executeStoredProcedure } from '../../../../shared/db/CallStoredProcedures/CallStoredProcedures';
import { OriginationRepository, ProjectsRepository } from '../../domain/Repositories/OriginationRepository';
import { OriginationRequest } from '../../domain/Request/OriginationRequest';


export class OriginationRepositoryImpl implements OriginationRepository {

  async getOriginationRepository(idOrigination: number):  Promise<OriginationRequest>{
    const result = await executeStoredProcedure('sp_get_ori_prospect_contact_by_pj', [idOrigination]);
    return result[0];
  }

  async setOriginationRepository(origination: OriginationRequest, userId: number): Promise<OriginationRequest> {

    let params: any[] = Object.values(origination); 
    params.push(userId)
    const result = await executeStoredProcedure('sp_set_ori_prospect_contact', params);
    return result[0];
  }

}

export class ProjectsRepositoryImpl implements ProjectsRepository {
  async getProjectsRepository(): Promise<any> {
    const result = await executeStoredProcedure('sp_get_projects', []);
    return result[0];
  }
}