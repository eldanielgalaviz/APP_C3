export interface ContratingRepository {
  getContratingRepository(idProject: number): Promise<any>;
  setContratingRepository(data: any, userId: number): Promise<any>;
}