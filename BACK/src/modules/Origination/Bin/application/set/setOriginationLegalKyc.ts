import { LegalKYCRepository } from "../../../domain/Repositories/OriginationLegalKycRepository";

export class setLegalKYC {
  constructor(private repository: LegalKYCRepository) { }

  async run(data: any, userId: number): Promise<any> {
    return this.repository.setLegalKYCRepository(data, userId);
  } 
}