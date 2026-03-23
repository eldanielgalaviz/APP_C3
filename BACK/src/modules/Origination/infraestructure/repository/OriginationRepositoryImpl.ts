import { executeStoredProcedure } from '../../../../shared/db/CallStoredProcedures/CallStoredProcedures';
import { plainToInstance } from 'class-transformer';
import { OriginationRepository } from '../../domain/OriginationRepository';
import { OriginationRequest } from '../../domain/OriginationRequest';
import { log } from 'console';

export class OriginationRepositoryImpl implements OriginationRepository {

  async getOriginationRepository(idOrigination: number):  Promise<OriginationRequest>{
    const result = await executeStoredProcedure('sp_get_prospect_contract_origination_by_id', [idOrigination]);
    return result[0];
  }

  async setOriginationRepository(origination: OriginationRequest): Promise<OriginationRequest> {

    const idUser = 5;
    let params: any[] = Object.values(origination); 
    params.push(idUser)
    const result = await executeStoredProcedure('sp_set_prospect_contact_origination', params);
    log
    return result[0];
  }

}