import { LegalKYCRepository } from "../../../domain/Repositories/OriginationLegalKycRepository";

export class getLegalKYC {
  constructor(private repository: LegalKYCRepository) {}

  async run(idProject: number): Promise<any> {
    return this.repository.getLegalKYCRepository(idProject);
  } 
}