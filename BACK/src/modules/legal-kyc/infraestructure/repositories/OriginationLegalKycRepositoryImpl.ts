import { executeStoredProcedure } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { LegalKYCRepository } from "../../domain/Repositories/OriginationLegalKycRepository";

//legal kyc
export class LegalKYCRepositoryImpl implements LegalKYCRepository {
    async getLegalKYCRepository(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_legal_kyc', [idProject]);
    return result[0];
  } 
  async setLegalKYCRepository(data: any, userId: number): Promise<any> {
    const params = [...Object.values(data), userId];
    const result = await executeStoredProcedure('set_legal_kyc', params);
    return result[0];
  } 
}