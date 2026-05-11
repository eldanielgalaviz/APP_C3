export interface CDRRepository {
  getCDRRepository(idProject: number): Promise<any>;
  setCDRRepository(data: any, userId: number): Promise<any>;
}