export interface LegalKYCRepository {
  getLegalKYCRepository(idProject: number): Promise<any>;
  setLegalKYCRepository(data: any, userId: number): Promise<any>;
}